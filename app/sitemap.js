// app/sitemap.js
import { connectDB } from "@/lib/db";
import Game from "@/models/Game";
import { SITE_URL } from "@/lib/seo";
import { shortMonthYear, slugify } from "@/lib/utils";

export const revalidate = 3600;

function recentChartUrls(now) {
  const urls = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    const dateKey = d.toISOString().slice(0, 10);
    urls.push({
      url: `${SITE_URL}/chart/result-chart-${shortMonthYear(dateKey)}`,
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
    games = await Game.find({ isActive: true }).select({ name: 1, updatedAt: 1 }).lean();
  } catch {
    // DB unavailable during build — year-chart URLs omitted this run
  }

  const yearChartUrls = games.flatMap((game) => {
    const slug = slugify(game.name);
    return [currentYear, currentYear - 1, currentYear - 2].map((year) => ({
      url: `${SITE_URL}/year-chart/${slug}-result-chart-${year}`,
      lastModified: game.updatedAt || now,
      changeFrequency: "daily",
      priority: 0.7,
    }));
  });

  const blogUrls = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...blogSlugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    })),
  ];

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/charts`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about-us`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/Privacy-Policy`, changeFrequency: "yearly", priority: 0.3 },
    ...blogUrls,
    ...recentChartUrls(now),
    ...yearChartUrls,
  ];
}
