"use server";

import dns from "node:dns/promises";
import net from "node:net";

import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { Resend } from "resend";

import clientPromise from "@/lib/mongodb";
import { formatMongoConnectionError } from "@/lib/mongoConnectionError";

export type ContactSubmissionResult =
  | { success: false; error: string }
  | { success: true; emailSent: true }
  | { success: true; emailSent: false; emailNotice: string };

/** Strip BOM / whitespace — fixes invisible .env issues */
function env(name: string): string | undefined {
  const v = process.env[name];
  if (v == null || v === "") return undefined;
  return v.replace(/^\uFEFF/, "").trim();
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getPublicSupportEmail(): string {
  return (
    env("PUBLIC_SUPPORT_EMAIL") ||
    env("CONTACT_RECEIVER_EMAIL") ||
    env("EMAIL_USER") ||
    ""
  );
}

function hasResendConfig(): boolean {
  return Boolean(env("RESEND_API_KEY") && env("CONTACT_RECEIVER_EMAIL"));
}

function hasSmtpConfig(): boolean {
  return Boolean(
    env("EMAIL_USER") && env("EMAIL_PASS") && env("CONTACT_RECEIVER_EMAIL"),
  );
}

async function resolveGmailIpv4Host(): Promise<{
  host: string;
  servername: string;
}> {
  if (env("GMAIL_SMTP_USE_HOSTNAME") === "1") {
    return { host: "smtp.gmail.com", servername: "smtp.gmail.com" };
  }
  try {
    const { address } = await dns.lookup("smtp.gmail.com", { family: 4 });
    if (net.isIPv4(address)) {
      return { host: address, servername: "smtp.gmail.com" };
    }
  } catch (err) {
    console.warn("smtp.gmail.com IPv4 lookup failed:", err);
  }
  return { host: "smtp.gmail.com", servername: "smtp.gmail.com" };
}

function createSmtpTransport(
  port: 465 | 587,
  host: string,
  servername: string,
  user: string,
  pass: string,
): nodemailer.Transporter {
  const tls = { minVersion: "TLSv1.2" as const, servername };
  const timeouts = {
    connectionTimeout: 60_000,
    greetingTimeout: 30_000,
    socketTimeout: 60_000,
  };
  const base = {
    host,
    servername,
    auth: { user, pass },
    pool: false,
    maxConnections: 1,
    ...timeouts,
    tls,
  };
  if (port === 465) {
    return nodemailer.createTransport({
      ...base,
      port: 465,
      secure: true,
    } as SMTPTransport.Options);
  }
  return nodemailer.createTransport({
    ...base,
    port: 587,
    secure: false,
    requireTLS: true,
  } as SMTPTransport.Options);
}

async function sendMailWithSmtpFallback(
  send: (t: nodemailer.Transporter) => Promise<void>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = env("EMAIL_USER");
  const pass = env("EMAIL_PASS");
  if (!user || !pass) {
    return { ok: false, error: "SMTP credentials missing" };
  }

  const { host, servername } = await resolveGmailIpv4Host();
  const ports: Array<465 | 587> =
    env("GMAIL_SMTP_PORT") === "465" ? [465, 587] : [587, 465];

  let lastMsg = "SMTP failed";
  for (const port of ports) {
    const t = createSmtpTransport(port, host, servername, user, pass);
    try {
      await send(t);
      t.close();
      return { ok: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      lastMsg = msg;
      console.error(`SMTP error (port ${port}, host=${host}):`, err);
      try {
        t.close();
      } catch {
        /* ignore */
      }
    }
  }
  return { ok: false, error: lastMsg };
}

async function sendViaResend(params: {
  adminTo: string;
  submitterEmail: string;
  adminSubject: string;
  adminHtml: string;
  adminText: string;
  userSubject: string;
  userHtml: string;
  userText: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const key = env("RESEND_API_KEY");
  if (!key) {
    return { ok: false, error: "RESEND_API_KEY missing" };
  }

  const from =
    env("RESEND_FROM") || "WebVision CRM <onboarding@resend.dev>";
  const resend = new Resend(key);

  const adminResult = await resend.emails.send({
    from,
    to: [params.adminTo],
    replyTo: params.submitterEmail,
    subject: params.adminSubject,
    html: params.adminHtml,
    text: params.adminText,
  });
  if (adminResult.error) {
    return {
      ok: false,
      error:
        adminResult.error.message ||
        String(adminResult.error) ||
        "Resend admin send failed",
    };
  }

  const userResult = await resend.emails.send({
    from,
    to: [params.submitterEmail],
    subject: params.userSubject,
    html: params.userHtml,
    text: params.userText,
  });
  if (userResult.error) {
    return {
      ok: false,
      error:
        userResult.error.message ||
        String(userResult.error) ||
        "Resend confirmation send failed",
    };
  }

  return { ok: true };
}

export async function handleContactSubmission(data: {
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  company: FormDataEntryValue | null;
  country: FormDataEntryValue | null;
  phone: string;
  interest: FormDataEntryValue | null;
  source: FormDataEntryValue | null;
}): Promise<ContactSubmissionResult> {
  const str = (v: FormDataEntryValue | null) =>
    typeof v === "string" ? v.trim() : "";

  const payload = {
    firstName: str(data.firstName),
    lastName: str(data.lastName),
    email: str(data.email),
    company: str(data.company),
    country: str(data.country),
    phone: data.phone?.trim() || "Not provided",
    interest: str(data.interest),
    source: str(data.source),
  };

  if (
    !payload.firstName ||
    !payload.lastName ||
    !payload.email ||
    !payload.company ||
    !payload.country ||
    !payload.interest ||
    !payload.source
  ) {
    return {
      success: false as const,
      error: "Please fill in all required fields.",
    };
  }

  try {
    const client = await clientPromise;
    const db = client.db("webvision_db");
    await db.collection("inquiries").insertOne({
      ...payload,
      fullName: `${payload.firstName} ${payload.lastName}`,
      submittedAt: new Date(),
    });
  } catch (error: unknown) {
    console.error("Contact MongoDB error:", error);
    return {
      success: false as const,
      error: formatMongoConnectionError(error),
    };
  }

  const supportEmail = getPublicSupportEmail();
  const safe = {
    firstName: escapeHtml(payload.firstName),
    lastName: escapeHtml(payload.lastName),
    company: escapeHtml(payload.company),
    email: escapeHtml(payload.email),
    phone: escapeHtml(payload.phone),
    interest: escapeHtml(payload.interest),
    country: escapeHtml(payload.country),
    source: escapeHtml(payload.source),
  };

  const adminText = [
    "New contact request",
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Company: ${payload.company}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Interest: ${payload.interest}`,
    `Country: ${payload.country}`,
    `Source: ${payload.source}`,
  ].join("\n");

  const adminSubject = `New Lead: ${payload.interest} - ${payload.company}`;
  const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #2563EB;">New Contact Request</h2>
        <p><strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p>
        <p><strong>Company:</strong> ${safe.company}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Interest:</strong> ${safe.interest}</p>
        <p><strong>Country:</strong> ${safe.country}</p>
        <p><strong>Source:</strong> ${safe.source}</p>
      </div>
    `;

  const support = supportEmail.trim();
  const supportHtml = support
    ? `<a href="mailto:${encodeURIComponent(support)}" style="color: #2563EB; font-weight: 600;">${escapeHtml(support)}</a>`
    : `<span style="color: #64748b;">the address listed on our website</span>`;

  const userText = [
    `Hi ${payload.firstName},`,
    "",
    "Your inquiry has been received. We will contact you shortly.",
    "",
    `Interest: ${payload.interest}`,
    "",
    support
      ? `For any queries, email us at: ${support}`
      : "For any queries, please use the contact options on our website.",
    "",
    "— WebVision Team",
  ].join("\n");

  const userHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #2563EB; padding: 28px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px;">WebVision</h1>
        </div>
        <div style="padding: 28px 22px;">
          <h2 style="color: #1e293b; margin-top: 0;">Hi ${safe.firstName},</h2>
          <p style="color: #475569; line-height: 1.65;">
            Your inquiry has been received. <strong>We will contact you shortly.</strong>
          </p>
          <p style="color: #475569; line-height: 1.65;">
            You asked about <strong>${safe.interest}</strong>. Our team will review your details and follow up.
          </p>
          <div style="background-color: #f8fafc; border-left: 4px solid #2563EB; padding: 16px 18px; margin: 22px 0; border-radius: 6px;">
            <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.55;">
              For any queries, mail us at:<br />
              <span style="font-size: 15px; margin-top: 8px; display: inline-block;">${supportHtml}</span>
            </p>
          </div>
          <p style="color: #475569; line-height: 1.65;">Thank you for contacting WebVision.</p>
          <p style="color: #1e293b; font-weight: bold; margin-bottom: 0;">The WebVision Team</p>
        </div>
        <div style="background-color: #f1f5f9; padding: 14px 20px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} WebVision. All rights reserved.
          </p>
        </div>
      </div>
    `;

  const userSubject = "We received your message — WebVision";
  const adminTo = env("CONTACT_RECEIVER_EMAIL");
  const smtpUser = env("EMAIL_USER");

  let adminOk = false;
  let userOk = false;
  let lastError = "";

  if (hasResendConfig() && adminTo) {
    const r = await sendViaResend({
      adminTo,
      submitterEmail: payload.email,
      adminSubject,
      adminHtml,
      adminText,
      userSubject,
      userHtml,
      userText,
    });
    if (r.ok) {
      return { success: true as const, emailSent: true as const };
    }
    lastError = r.error;
    console.error("Resend failed, trying SMTP if configured:", r.error);
  }

  if (hasSmtpConfig() && adminTo && smtpUser) {
    const adminResult = await sendMailWithSmtpFallback(async (t) => {
      await t.sendMail({
        from: `"WebVision CRM" <${smtpUser}>`,
        to: adminTo,
        replyTo: payload.email,
        subject: adminSubject,
        text: adminText,
        html: adminHtml,
      });
    });
    adminOk = adminResult.ok;
    if (!adminResult.ok) {
      lastError = adminResult.error;
    }

    const userResult = await sendMailWithSmtpFallback(async (t) => {
      await t.sendMail({
        from: `"WebVision" <${smtpUser}>`,
        to: payload.email,
        subject: userSubject,
        text: userText,
        html: userHtml,
      });
    });
    userOk = userResult.ok;
    if (!userResult.ok && !lastError) {
      lastError = userResult.error;
    }

    if (adminOk && userOk) {
      return { success: true as const, emailSent: true as const };
    }
  } else if (!hasResendConfig()) {
    lastError =
      lastError ||
      "No working mail setup: add RESEND_API_KEY + CONTACT_RECEIVER_EMAIL, or EMAIL_USER + EMAIL_PASS + CONTACT_RECEIVER_EMAIL.";
  }

  if (adminOk && !userOk) {
    return {
      success: true as const,
      emailSent: false as const,
      emailNotice:
        "Your inquiry was saved and our team was notified. We could not send a confirmation to your email — check spam or try again later.",
    };
  }
  if (!adminOk && userOk) {
    return {
      success: true as const,
      emailSent: false as const,
      emailNotice:
        "We sent you a confirmation, but could not notify our team inbox. Your inquiry is saved.",
    };
  }

  const configured = hasResendConfig() || hasSmtpConfig();
  return {
    success: true as const,
    emailSent: false as const,
    emailNotice: configured
      ? `Your inquiry was saved, but email delivery failed: ${lastError}. If Gmail SMTP is blocked on your network, use Resend: set RESEND_API_KEY and CONTACT_RECEIVER_EMAIL at https://resend.com`
      : "Your inquiry was saved. Add mail settings: either RESEND_API_KEY + CONTACT_RECEIVER_EMAIL (recommended), or EMAIL_USER + EMAIL_PASS + CONTACT_RECEIVER_EMAIL — then restart the dev server.",
  };
}
