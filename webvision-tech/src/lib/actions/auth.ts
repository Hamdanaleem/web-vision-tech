"use server";

import { cookies } from "next/headers";

export async function loginAdmin(password: string) {
  const adminPass = process.env.ADMIN_PASSWORD;

  if (password === adminPass) {
    // Set an HTTP-only cookie that lasts for 24 hours
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Incorrect Password" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

export async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.has("admin_session");
}