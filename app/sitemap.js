// app/sitemap.js
import { connectDB } from "@/lib/db";
import Game from "@/models/Game";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sattakingfast.com";

function shortMonthYear(dateKey) {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  return date
    .toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
    .replace(" ", "-");
}

function slugify(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function recentChartUrls(now) {
  const urls = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    const dateKey = d.toISOString().slice(0, 10);
    urls.push({
      url: `${siteUrl}/chart/result-chart-${shortMonthYear(dateKey)}`,
      lastModified: i === 0 ? now : d,
      changeFrequency: i === 0 ? "daily" : "monthly",
      priority: i === 0 ? 0.8 : 0.5,
    });
  }
  return urls;
}

const blogSlugs = [
  "how-to-read-satta-king-charts",
  "desawer-result-history",
  "gali-satta-result-tips",
  "faridabad-ghaziabad-chart-2025",
];

export default async function sitemap() {
  const now = new Date();
  const currentYear = now.getUTCFullYear();

  let games = [];
  try {
    await connectDB();
    games = await Game.find({ isActive: true }).select({ name: 1 }).lean();
  } catch {
    // DB unavailable during build — year-chart URLs omitted this run
  }

  const yearChartUrls = games.flatMap((game) => {
    const slug = slugify(game.name);
    return [currentYear, currentYear - 1].map((year) => ({
      url: `${siteUrl}/year-chart/${slug}-result-chart-${year}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    }));
  });

  const blogUrls = [
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    })),
  ];

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "always", priority: 1.0 },
    { url: `${siteUrl}/charts`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/Privacy-Policy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    ...blogUrls,
    ...recentChartUrls(now),
    ...yearChartUrls,
  ];
}