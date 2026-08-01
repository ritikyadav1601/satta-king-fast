import MonthlyChartTable from "@/components/MonthlyChartTable";
import PublicLayout from "@/components/PublicLayout";
import { getMonthlyRows } from "@/lib/data";
import { monthName } from "@/lib/utils";
import { notFound } from "next/navigation";

export const revalidate = 300;

function parseChartSlug(slug = "") {
  const match = decodeURIComponent(slug).match(/^result-chart-([A-Za-z]{3})-(\d{4})$/);
  if (!match) return null;
  const date = new Date(`${match[1]} 1, ${match[2]} 00:00:00 UTC`);
  if (Number.isNaN(date.getTime()) || date.getUTCFullYear() !== Number(match[2])) return null;
  const now = new Date();
  const currentMonth = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
  if (date.getTime() > currentMonth || date.getUTCFullYear() < 2005) return null;
  return date;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const date = parseChartSlug(resolvedParams.slug);
  if (!date) return { title: "Chart Not Found", robots: { index: false, follow: false } };
  const raw = decodeURIComponent(resolvedParams.slug).replace(/^result-chart-/, "");
  return {
    title: `Satta King Record Chart ${raw.replace(/-/g, " ")}`,
    description: `Check Satta King result chart for ${raw.replace(/-/g, " ")}. Daily updated market-wise records.`,
    alternates: { canonical: `/chart/${resolvedParams.slug}` },
  };
}

export default async function MonthChartPage({ params }) {
  const resolvedParams = await params;
  const date = parseChartSlug(resolvedParams.slug);
  if (!date) notFound();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const monthly = await getMonthlyRows({ year, month, untilToday: false });
  const dateKey = `${year}-${String(month).padStart(2, "0")}-01`;

  return (
    <PublicLayout>
      <MonthlyChartTable title={`Satta King Record Chart ${monthName(dateKey)}`} rows={monthly.rows} columns={monthly.gameColumns} dateKey={dateKey} />
    </PublicLayout>
  );
}
