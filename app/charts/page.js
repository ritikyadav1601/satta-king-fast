import MonthlyChartTable from "@/components/MonthlyChartTable";
import PublicLayout from "@/components/PublicLayout";
import { getMonthlyRows } from "@/lib/data";
import { istDate, monthName } from "@/lib/utils";

export const revalidate = 30;

export const metadata = {
  title: "Monthly Satta King Result Chart",
  description: "Check the current monthly Satta King result chart with daily records for Desawer, Gali, Faridabad, Ghaziabad and other markets.",
  alternates: { canonical: "/charts" },
};

export default async function ChartsPage() {
  const monthly = await getMonthlyRows({ untilToday: true });
  const today = istDate();
  return (
    <PublicLayout>
      <MonthlyChartTable title={`Satta King Record Chart ${monthName(today)}`} rows={monthly.rows} columns={monthly.gameColumns} dateKey={today} />
    </PublicLayout>
  );
}
