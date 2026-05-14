import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminShell({ children }) {
  await requireAdmin();

  return (
    <div>
      <link rel="stylesheet" href="/admin/bootstrap.min.css" />
      <link rel="stylesheet" href="/admin/style.css" />
      <div className="sidebar active">
        <div className="logo_content">
          <div className="logo">
            <i className="bx bxl-javascript"></i>
            <div className="logo_name">SATTAHUB</div>
          </div>
          <i className="bx bx-menu" id="btn"></i>
        </div>
        <ul className="nav_list">
          <li><Link href="/admin/dashboard"><i className="bx bx-grid-alt"></i><span className="links_name">Home</span></Link><span className="tooltip">Dashboard</span></li>
          <li><Link href="/admin/games"><i className="bx bx-user"></i><span className="links_name">Games</span></Link><span className="tooltip">Games</span></li>
          <li><Link href="/admin/game/result"><i className="bx bx-user"></i><span className="links_name">Game Result</span></Link><span className="tooltip">Game Result</span></li>
          <li><Link href="/admin/ad"><i className="bx bx-user"></i><span className="links_name">Ad Manager</span></Link><span className="tooltip">Ad Manager</span></li>
          <li><form action="/api/auth/logout" method="POST"><button style={{ background: "transparent", color: "white", border: 0 }}><i className="bx bx-log-out"></i><span className="links_name">Logout</span></button></form><span className="tooltip">Logout</span></li>
        </ul>
      </div>
      <div className="home_content">{children}</div>
      <script dangerouslySetInnerHTML={{ __html: `document.addEventListener('click',function(e){if(e.target && e.target.id==='btn'){document.querySelector('.sidebar')?.classList.toggle('active')}});if(window.innerWidth<=768){document.querySelector('.sidebar')?.classList.remove('active')}` }} />
    </div>
  );
}
