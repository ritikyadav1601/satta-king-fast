import AdminShell from "@/components/admin/AdminShell";
import { getAds } from "@/lib/data";
import { saveWebsiteAd } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdPage() {
  const ads = await getAds();
  const byWebsite = Object.fromEntries(ads.map((ad) => [ad.website, ad]));
  const sections = [
    { website: "satta-king-24-1", title: "Satta King 24 - Khaiwal 1", fallback: byWebsite["satta-king-24"] },
    { website: "satta-king-24-2", title: "Satta King 24 - Khaiwal 2", fallback: byWebsite["satta-king-24"] },
    { website: "satta-king-fast", title: "Satta King Fast" }
  ];
  return (
    <AdminShell>
      <div className="container">
        <div className="admin-card"><strong>Ad Manager</strong></div>
        {sections.map(({ website, title, fallback }) => {
          const ad = byWebsite[website] || fallback || {};
          return (
            <div className="admin-card" key={website}>
              <h3>{title}</h3>
              <form action={saveWebsiteAd} className="admin-form">
                <input type="hidden" name="website" value={website} />
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <label className="form-label">Name</label>
                    <input name="name" defaultValue={ad.khaiwalName || ""} required />
                  </div>
                  <div className="col-md-4 mb-4">
                    <label className="form-label">Contact No.</label>
                    <input name="contactNumber" defaultValue={ad.whatsappNumber || ad.gpayNumber || ""} inputMode="tel" required />
                  </div>
                  <div className="col-md-2 mb-4">
                    <label className="form-label">&nbsp;</label>
                    <button className="admin-btn">Save</button>
                  </div>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}
