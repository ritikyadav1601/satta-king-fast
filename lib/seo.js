const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sattakingfast.com";

export const SITE_URL = configuredSiteUrl.replace(/\/+$/, "");
export const SITE_NAME = "Satta King Fast";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
