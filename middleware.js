import { NextResponse } from "next/server";

const CANONICAL_HOST = "sattakingfast.com";

export function middleware(request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = (forwardedHost || request.headers.get("host") || "").split(":")[0].toLowerCase();

  if (host !== `www.${CANONICAL_HOST}`) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.protocol = "https:";
  destination.hostname = CANONICAL_HOST;
  destination.port = "";

  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: "/((?!_next/|favicon.ico|icon.png|apple-icon.png).*)"
};
