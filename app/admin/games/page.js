import AdminShell from "@/components/admin/AdminShell";
import { getAdminGames } from "@/lib/data";
import { deleteGame, saveGame } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function GamesPage() {
  const games = await getAdminGames();
  return (
    <AdminShell>
      <div className="container">
        <div className="admin-card"><strong>Games</strong></div>
        <div className="admin-card">
          <form action={saveGame} className="admin-form" id="gameForm">
            <input type="hidden" name="id" id="gameId" />
            <div className="row">
              <div className="col-md-2 mb-4"><label>Name</label><input name="name" id="name" required /></div>
              <div className="col-md-2 mb-4"><label>Code</label><input name="code" id="code" required /></div>
              <div className="col-md-2 mb-4"><label>Result Time</label><input type="time" name="resultTime" id="resultTime" required /></div>
              <div className="col-md-2 mb-4"><label>Show Number</label><input type="number" name="showIndex" id="showIndex" required /></div>
              <div className="col-md-2 mb-4"><label>&nbsp;</label><button className="admin-btn" id="submitBtn">ADD</button></div>
            </div>
          </form>
        </div>
        <div className="admin-card">
          <div className="admin-table-wrap">
            <table className="table table-bordered">
              <thead><tr><th>Name</th><th>Code</th><th>ResultTime</th><th>Index</th><th>Action</th></tr></thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game._id}>
                    <td>{game.name}</td>
                    <td>{game.code}</td>
                    <td>{game.resultTime}</td>
                    <td>{game.showIndex}</td>
                    <td className="d-flex gap-2">
                      <button className="admin-btn" type="button" data-game={JSON.stringify(game)}>Edit</button>
                      <form action={deleteGame}>
                        <input type="hidden" name="id" value={game._id} />
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
      <script dangerouslySetInnerHTML={{ __html: `document.addEventListener('click',function(e){const btn=e.target.closest('[data-game]');if(!btn)return;const g=JSON.parse(btn.dataset.game);gameId.value=g._id;name.value=g.name||'';code.value=g.code||'';resultTime.value=(g.resultTime||'').slice(0,5);showIndex.value=g.showIndex||0;submitBtn.textContent='Update';window.scrollTo({top:0,behavior:'smooth'});})` }} />
    </AdminShell>
  );
}
