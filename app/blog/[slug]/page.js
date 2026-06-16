// app/blog/[slug]/page.js
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import { notFound } from "next/navigation";

export const revalidate = 300;

// ─── Post content ────────────────────────────────────────────────────────────
const posts = {
  "how-to-read-satta-king-charts": {
    title: "How to Read Satta King Charts",
    date: "2025-05-01",
    body: `Satta King charts are tables that show daily results for each market organised by date. Every row is a date and every column is a market (Desawer, Gali, Faridabad, Ghaziabad and so on).

**Monthly charts** show results for a single calendar month. You can navigate between months using the Previous and Next buttons at the bottom of the chart page.

**Yearly charts** show all 12 months in one place for a single market. This makes it easy to compare how a market's numbers have moved across the whole year.

To find a specific result, go to the chart for that month and look at the row for the date you need. A dash ( - ) means no result was recorded. "XX" means the result is pending and will be updated once declared.

Use the chart pages regularly to build familiarity with how each market behaves across different dates and months.`,
  },
  "desawer-result-history": {
    title: "Desawer Result History & Chart Guide",
    date: "2025-04-15",
    body: `Desawer (also spelled Disawer or Desawar) is one of the oldest Satta markets. Its result is declared around 3:20 AM IST, making it the first major result of the day.

**Why Desawer is popular**
Because it opens early, many players check Desawer first thing in the morning. Its long history also means there is a large archive of old records available to study.

**Checking Desawer history**
Visit the Desawer Yearly Chart page from the home page. Select the year you want from the dropdown and the table will show every result for that year, broken down by date and month.

For the current month's results, use the monthly chart on the Charts page and look at the Desawer column.

The chart is updated daily once the result is declared, so bookmarking the yearly chart page is the fastest way to track Desawer records over time.`,
  },
  "gali-satta-result-tips": {
    title: "Gali Satta Result – What Time & How to Check",
    date: "2025-04-01",
    body: `Gali is one of the four main Satta markets alongside Desawer, Faridabad and Ghaziabad. Its result is declared at approximately 11:20 PM IST.

**When to check**
Because Gali closes late at night, its result for a given calendar date is written to the previous day's record in our system (for results declared after midnight). This is standard practice for late-night markets.

**Live result**
The home page shows the live Gali result as soon as it is updated. If the result has not yet been declared, you will see "XX" in place of the number — this means the result is pending.

**Old results**
To check old Gali records, go to the Gali Yearly Chart page. You can select any year from 2005 onwards and see the full record in a date-by-month table. Monthly records are also available on the Charts page.

Checking old results regularly helps you understand the range of numbers Gali has historically produced.`,
  },
  "faridabad-ghaziabad-chart-2025": {
    title: "Faridabad & Ghaziabad Chart 2025",
    date: "2025-03-20",
    body: `Faridabad and Ghaziabad are two of the most-watched evening Satta markets. Here is a quick reference for both.

**Faridabad**
Result time: approximately 5:50 PM IST.
Faridabad has a long record history. Its results are listed in the monthly and yearly chart pages under the FB column in monthly charts.

**Ghaziabad**
Result time: approximately 8:20 PM IST.
Ghaziabad follows Faridabad in the evening session. It is listed under the GB column in monthly charts.

**Checking 2025 records**
Open the yearly chart for either market from the home page link list. The dropdown on the yearly chart page lets you switch between years. All results from January 2025 onwards are available once declared.

**Comparing the two**
Because both markets run in the same evening window, many players track them side by side. The monthly chart on the Charts page shows both columns together, making comparison straightforward.`,
  },
};

// ─── generateStaticParams ─────────────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

// ─── generateMetadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} | Satta King Fast Blog`,
    description: post.body.slice(0, 155).replace(/\*\*/g, "").replace(/\n/g, " ") + "…",
    alternates: { canonical: `/blog/${slug}` },
  };
}

// ─── Simple markdown-lite renderer (bold + paragraphs only) ──────────────────
function renderBody(text) {
  return text.split(/\n\n+/).map((para, i) => {
    const html = para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    return (
      <p
        key={i}
        className="text-gray-800 leading-relaxed mb-4 text-sm md:text-base"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00.000Z`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <PublicLayout>
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:underline">Home</Link>
          {" › "}
          <Link href="/blog" className="hover:underline">Blog</Link>
          {" › "}
          <span className="text-gray-600">{post.title}</span>
        </nav>

        <article>
          <p className="text-xs text-gray-400 mb-1">{formatDate(post.date)}</p>
          <h1 className="text-2xl font-bold text-red-600 mb-5">{post.title}</h1>
          <div>{renderBody(post.body)}</div>
        </article>

        <div className="mt-8 pt-5 border-t border-gray-200">
          <Link
            href="/blog"
            className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            ← Back to Blog
          </Link>
        </div>
      </main>
    </PublicLayout>
  );
}