export function appUrl(path = "/", request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return new URL(path, configured);

  const headers = request?.headers;
  const forwardedHost = headers?.get("x-forwarded-host");
  const forwardedProto = headers?.get("x-forwarded-proto") || "https";
  if (forwardedHost) return new URL(path, `${forwardedProto}://${forwardedHost}`);

  return new URL(path, request?.url || "http://localhost:3000");
}
