import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminShell({ children }) {
  await requireAdmin();

  return (
    <div className="admin-shell">
      <link rel="stylesheet" href="/admin/bootstrap.min.css" />
      <link rel="stylesheet" href="/admin/boxicons.min.css" />
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
      <div className="admin-loader" id="adminLoader" aria-live="polite" aria-hidden="true">
        <div className="admin-loader-box">
          <span className="admin-spinner"></span>
          <span>Please wait...</span>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `function showAdminLoader(){const loader=document.getElementById('adminLoader');if(!loader)return;loader.classList.add('show');loader.setAttribute('aria-hidden','false')}document.addEventListener('submit',function(e){const form=e.target;if(!form||form.dataset.noLoader==='true')return;showAdminLoader();const btn=form.querySelector('button[type="submit"],button:not([type])');if(btn){btn.disabled=true;btn.classList.add('is-loading')}});document.addEventListener('click',function(e){const sidebar=document.querySelector('.sidebar');if(sidebar){if(e.target&&e.target.id==='btn'){if(window.innerWidth<=768)sidebar.classList.toggle('mobile-open');else sidebar.classList.toggle('active')}else if(window.innerWidth<=768&&e.target.closest('.sidebar a')){sidebar.classList.remove('mobile-open')}}const action=e.target.closest('a,button');if(!action||action.type==='button'||action.dataset.noLoader==='true')return;if(action.closest('form'))return;if(action.tagName==='A'&&action.getAttribute('href')&&action.getAttribute('href')!=='#')showAdminLoader();});function syncAdminSidebar(){const sidebar=document.querySelector('.sidebar');if(!sidebar)return;if(window.innerWidth<=768){sidebar.classList.remove('active')}else{sidebar.classList.remove('mobile-open');sidebar.classList.add('active')}}syncAdminSidebar();window.addEventListener('resize',syncAdminSidebar);` }} />
    </div>
  );
}
