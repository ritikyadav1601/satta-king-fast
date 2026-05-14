import MonthlyChartTable from "@/components/MonthlyChartTable";
import PublicLayout from "@/components/PublicLayout";
import { getMonthlyRows } from "@/lib/data";
import { monthName } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ChartsPage() {
  const monthly = await getMonthlyRows({ untilToday: true });
  return (
    <PublicLayout>
      <MonthlyChartTable title={`Satta King Record Chart ${monthName(new Date().toISOString().slice(0, 10))}`} rows={monthly.rows} columns={monthly.gameColumns} />
    </PublicLayout>
  );
}
