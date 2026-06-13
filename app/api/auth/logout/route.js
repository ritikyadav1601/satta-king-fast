import { NextResponse } from "next/server";
import { sessionCookieName } from "@/lib/auth";
import { appUrl } from "@/lib/url";

export async function POST(request) {
  const response = NextResponse.redirect(appUrl("/", request), 303);
  response.cookies.set(sessionCookieName(), "", { path: "/", maxAge: 0 });
  return response;
}
