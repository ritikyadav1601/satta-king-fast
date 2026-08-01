import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Satta King Fast - Live Results & Daily Number Charts",
    template: `%s | ${SITE_NAME}`,
  },
  description: "Check live results, daily updates, fast number charts, and market records with quick access, simple layout, and regular updates for users.SattaKingFast.Com",
  verification: {
    google: "atrP2Nan2ywH60TPdfGhm7mUuD2X5ZJEVAm_FFBlKWQ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Satta King Fast - Live Results & Daily Number Charts",
    description: "Check live results, daily updates, fast number charts, and market records with quick access, simple layout, and regular updates.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/img/logosm-small-320.png", width: 320, height: 84, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satta King Fast - Live Results & Daily Number Charts",
    description: "Check live results, daily updates, and historical result charts.",
    images: ["/img/logosm-small-320.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "64x64" }
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
  };

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="atrP2Nan2ywH60TPdfGhm7mUuD2X5ZJEVAm_FFBlKWQ" />
        <link rel="stylesheet" href="/asset/app.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
