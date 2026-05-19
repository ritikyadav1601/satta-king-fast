import AdminShell from "@/components/admin/AdminShell";
import { getAdminGames, getResultsForDate } from "@/lib/data";
import { deleteGameResult, saveGameResult } from "@/app/admin/actions";
import { istDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function GameResultPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const date = resolvedSearchParams?.date || istDate();
  const [games, results] = await Promise.all([getAdminGames(), getResultsForDate(date)]);

  return (
    <AdminShell>
      <div className="container">
        <div className="admin-card"><strong>Game Result</strong></div>
        <div className="admin-card">
          <form action={saveGameResult} className="admin-form">
            <div className="row">
              <div className="col-md-2 mb-4">
                <label>Game Name</label>
                <select name="game" required>
                  <option value="">Select Game</option>
                  {games.map((game) => <option key={game._id} value={game._id}>{game.name}</option>)}
                </select>
              </div>
              <div className="col-md-2 mb-4"><label>Date</label><input type="date" name="resultDate" defaultValue={date} required /></div>
              <div className="col-md-2 mb-4"><label>Result</label><input name="result" required /></div>
              <div className="col-md-2 mb-4"><label>&nbsp;</label><button className="admin-btn">Save</button></div>
            </div>
          </form>
        </div>
        <div className="admin-card">
          <form method="GET" className="admin-form mb-3">
            <label>Show results for date</label>
            <div className="d-flex gap-2">
              <input type="date" name="date" defaultValue={date} />
              <button className="admin-btn">Load</button>
            </div>
          </form>
          <div className="admin-table-wrap">
            <table className="table table-bordered">
              <thead><tr><th>Name</th><th>Date</th><th>Result</th><th>Action</th></tr></thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item._id}>
                    <td>{item.game?.name}</td>
                    <td>{item.resultDate}</td>
                    <td>{item.result}</td>
                    <td>
                      <form action={deleteGameResult}>
                        <input type="hidden" name="id" value={item._id} />
                        <input type="hidden" name="date" value={date} />
                        <button className="admin-btn danger">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
