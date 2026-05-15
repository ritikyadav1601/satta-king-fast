function chunkColumns(columns, chunkSize) {
  const chunks = [];
  for (let index = 0; index < columns.length; index += chunkSize) {
    chunks.push(columns.slice(index, index + chunkSize));
  }
  return chunks;
}

function displayGameName(game) {
  const name = game.replaceAll("_", " ").trim();
  const normalized = name.toLowerCase();
  const shortNames = {
    desawer: "DS",
    desawar: "DS",
    "delhi bazar": "DB",
    "shri ganesh": "SG",
    ghaziabad: "GB",
    faridabad: "FB"
  };

  return shortNames[normalized] || name.toUpperCase();
}

function ResultText({ value }) {
  const result = value || "-";
  const pending = String(result).toUpperCase() === "XX";
  return <span className={pending ? "result-pending" : undefined}>{result}</span>;
}

function ChartTables({ rows, chunks }) {
  return chunks.map((group, groupIndex) => (
    <table key={groupIndex} className="satta-results-table w-full border border-gray-400 mb-5">
      <thead>
        <tr className="bg-[#5a2d0c] text-white text-sm md:text-base">
          <th className="whitespace-nowrap px-3 py-2 border border-gray-400">Date</th>
          {group.map((game) => (
            <th key={game} className="text-center px-3 py-2 border border-gray-400">
              {displayGameName(game)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`${groupIndex}-${row.Date}-${rowIndex}`} className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-purple-50"} text-center`}>
            <td className="px-3 py-2 border border-gray-400 font-semibold text-sm md:text-base text-left">{row.Date}</td>
            {group.map((game) => (
              <td key={game} className="px-3 py-2 border border-gray-400 text-sm md:text-base">
                <ResultText value={row[game]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ));
}

export default function MonthlyChartTable({ title, rows, columns, chunkSize = 10 }) {
  const desktopChunks = chunkColumns(columns, chunkSize);
  const mobileChunks = chunkColumns(columns, 6);

  return (
    <div className="mx-auto mt-5">
      <div className="satta-table-container">
        <h2 className="text-center font-bold text-lg md:text-xl py-3 bg-yellow-400 uppercase">{title}</h2>
        <div className="table-wrapper monthly-chart-desktop mb-8">
          <ChartTables rows={rows} chunks={desktopChunks} />
        </div>
        <div className="table-wrapper monthly-chart-mobile mb-8">
          <ChartTables rows={rows} chunks={mobileChunks} />
        </div>
      </div>
    </div>
  );
}
