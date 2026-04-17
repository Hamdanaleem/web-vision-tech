"use server";

import { Resend } from "resend";
import clientPromise from "@/lib/mongodb";

export async function handleNewsletterSubscription(email: string) {
  // Validate email
  if (!email || !email.includes("@")) {
    return { success: false as const, error: "Please enter a valid email address." };
  }

  const cleanEmail = email.trim().toLowerCase();

  // Save to MongoDB
  try {
    const client = await clientPromise;
    const db = client.db("webvision_db");

    // Check if already subscribed
    const existing = await db.collection("newsletter").findOne({ email: cleanEmail });
    if (existing) {
      return { success: false as const, error: "This email is already subscribed." };
    }

    await db.collection("newsletter").insertOne({
      email: cleanEmail,
      subscribedAt: new Date(),
    });
  } catch (error: unknown) {
    console.error("Newsletter MongoDB error:", error);
    return { success: false as const, error: "Could not save your subscription. Please try again." };
  }

  // Send confirmation email via Resend
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.EMAIL_USER;
    if (apiKey && senderEmail) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: `WebVision <${senderEmail}>`,
        to: cleanEmail,
        subject: "You're subscribed to WebVision Newsletter!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(to right, #2563EB, #7c3aed); padding: 30px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">WebVision</h1>
            </div>

            <!-- Body -->
            <div style="padding: 30px 20px;">
              <h2 style="color: #1e293b;">You're in! 🎉</h2>
              <p style="color: #475569; line-height: 1.6;">
                Thank you for subscribing to the <strong>WebVision Newsletter</strong>.
                You'll now receive the latest news and updates in software engineering 
                and enterprise solutions directly in your inbox.
              </p>

              <div style="background-color: #f8fafc; border-left: 4px solid #2563EB; padding: 15px 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #475569; font-size: 14px;">
                  Have questions? Feel free to reach out to us at:
                </p>
                <p style="margin: 8px 0 0; font-weight: bold; color: #2563EB;">
                  📧 ${senderEmail}
                </p>
              </div>

              <p style="color: #1e293b; font-weight: bold;">The WebVision Team</p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f1f5f9; padding: 15px 20px; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} WebVision. All rights reserved.
              </p>
            </div>

          </div>
        `,
      });
    }
  } catch (error: unknown) {
    console.error("Newsletter email error (subscription was saved):", error);
  }

  return { success: true as const };
}