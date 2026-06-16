// app/blog/page.js
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";

export const revalidate = 300;

export const metadata = {
  title: "Satta King Blog – Tips, Charts & Result Updates | Satta King Fast",
  description:
    "Read the latest Satta King blog posts covering result updates, chart analysis, market tips, and historical data for Gali, Desawer, Faridabad, Ghaziabad and more.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    slug: "how-to-read-satta-king-charts",
    title: "How to Read Satta King Charts",
    date: "2025-05-01",
    excerpt:
      "Satta King charts show daily results market-wise. Learn how to read monthly and yearly charts to track old records and number patterns easily.",
  },
  {
    slug: "desawer-result-history",
    title: "Desawer Result History & Chart Guide",
    date: "2025-04-15",
    excerpt:
      "Desawer is one of the oldest and most popular Satta markets. This guide explains how to check Desawer result history using our yearly and monthly charts.",
  },
  {
    slug: "gali-satta-result-tips",
    title: "Gali Satta Result – What Time & How to Check",
    date: "2025-04-01",
    excerpt:
      "Gali result is declared around 11:20 PM IST. Here's everything you need to know about checking Gali Satta results live and in old record charts.",
  },
  {
    slug: "faridabad-ghaziabad-chart-2025",
    title: "Faridabad & Ghaziabad Chart 2025",
    date: "2025-03-20",
    excerpt:
      "Complete monthly and yearly chart records for Faridabad (5:50 PM) and Ghaziabad (8:20 PM). Compare old results and find number trends in one place.",
  },
];

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00.000Z`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  return (
    <PublicLayout>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-2 text-center">
          Satta King Blog
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Tips, chart guides, and result updates for all major Satta markets.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white"
            >
              <p className="text-xs text-gray-400 mb-1">{formatDate(post.date)}</p>
              <h2 className="text-lg font-bold text-blue-700 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-3 text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}