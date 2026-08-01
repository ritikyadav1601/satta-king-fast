import PublicLayout from "@/components/PublicLayout";
import { getYearChartRows } from "@/lib/data";
import { notFound } from "next/navigation";

export const revalidate = 300;

function parseYearChartSlug(value = "") {
  const match = decodeURIComponent(value).match(/^([a-z0-9]+(?:-[a-z0-9]+)*)-result-chart-(\d{4})$/);
  if (!match) return null;
  const year = Number(match[2]);
  if (year < 2005 || year > new Date().getFullYear()) return null;
  return { slug: match[1], year };
}

function ResultText({ value }) {
  const result = value || "-";
  const pending = String(result).toUpperCase() === "XX";
  return <span className={pending ? "result-pending" : undefined}>{result}</span>;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const parsed = parseYearChartSlug(resolvedParams.slugYear);
  if (!parsed) return { title: "Chart Not Found", robots: { index: false, follow: false } };
  const { slug, year } = parsed;
  const name = slug.replace(/-/g, " ").toUpperCase();
  return {
    title: `${name} Yearly Chart ${year}`,
    description: `${name} yearly result chart ${year}. Check all monthly and daily records for ${name} in one place.`,
    alternates: { canonical: `/year-chart/${resolvedParams.slugYear}` },
  };
}

export default async function YearChartPage({ params }) {
  const resolvedParams = await params;
  const parsed = parseYearChartSlug(resolvedParams.slugYear);
  if (!parsed) notFound();
  const { slug, year } = parsed;
  const { rows, game } = await getYearChartRows(slug, year);
  if (!game?._id) notFound();
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return (
    <PublicLayout>
      <div className="max-w-lg mx-auto px-4 py-5 text-center flex flex-wrap justify-center gap-3 mt-5 -mb-5 lg:-mb-8">
        <h1 className="text-2xl md:text-1xl font-bold">Select Year</h1>
        <form action={`/year-chart/${slug}-result-chart-${year}`} className="flex gap-3" id="yearForm">
          <select name="year" className="border border-gray-400 px-4 py-2 rounded-md text-sm" defaultValue={year} onChange={null}>
            {Array.from({ length: year - 2004 }, (_, i) => year - i).map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </form>
      </div>
      <div className="fluid-panel my-8">
        <h2 className="bg-yellow-400 text-black font-bold text-lg md:text-2xl text-center py-3 uppercase">
          {slug.toUpperCase()} YEARLY CHART {year}
        </h2>
        <div className="overflow-x-auto mt-6">
          <table className="w-full border border-gray-400">
            <thead>
              <tr className="bg-[#5a2d0c] text-white text-sm md:text-base">
                <th className="px-3 py-2 border border-gray-400">DATE</th>
                {months.map((month) => <th className="px-3 py-2 border border-gray-400 whitespace-nowrap" key={month}>{month}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr className="bg-purple-50 text-center" key={row.Date}>
                  <td className="px-3 py-2 border border-gray-400 font-semibold text-sm md:text-base text-center">{row.Date}</td>
                  {months.map((month) => <td className="px-3 py-2 border border-gray-400 text-sm md:text-base" key={month}><ResultText value={row[month]} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `document.addEventListener('change',function(e){if(e.target.name==='year'){location.href='/year-chart/${slug}-result-chart-'+e.target.value;}})` }} />
    </PublicLayout>
  );
}
