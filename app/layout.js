import "./globals.css";

export const metadata = {
  title: "SattaKingFast",
  description: "Daily superfast Satta King results and old charts."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/asset/app.css" />
        <link rel="shortcut icon" href="/img/logosm.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
