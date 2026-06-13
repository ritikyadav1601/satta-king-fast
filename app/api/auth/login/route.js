import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { makeSession, sessionCookieName, verifyPassword } from "@/lib/auth";
import { appUrl } from "@/lib/url";
import User from "@/models/User";

export async function POST(request) {
  const form = await request.formData();
  await connectDB();
  const user = await User.findOne({ email: form.get("email") }).lean();
  const ok = user && (await verifyPassword(form.get("password") || "", user.password));
  if (!ok) return NextResponse.redirect(appUrl("/admin/login?error=1", request), 303);

  const response = NextResponse.redirect(appUrl("/admin/dashboard", request), 303);
  response.cookies.set(sessionCookieName(), makeSession(user._id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
