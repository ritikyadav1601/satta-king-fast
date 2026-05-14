import AdminShell from "@/components/admin/AdminShell";
import { getAds } from "@/lib/data";
import { saveAd } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdPage() {
  const ads = await getAds();
  const ad = ads[0] || {};
  return (
    <AdminShell>
      <div className="container">
        <div className="admin-card"><strong>Ad Manager</strong></div>
        <div className="admin-card">
          <form action={saveAd} className="admin-form">
            <input type="hidden" name="id" defaultValue={ad?._id || ""} />
            <div className="row">
              <div className="col-md-3 mb-4">
                <label className="form-label">Name</label>
                <input name="khaiwalName" defaultValue={ad?.khaiwalName || ""} />
              </div>
              <div className="col-md-3 mb-4">
                <label className="form-label">Payment Number</label>
                <input name="gpayNumber" defaultValue={ad?.gpayNumber || ""} />
              </div>
              <div className="col-md-3 mb-4">
                <label className="form-label">WhatsApp Number</label>
                <input name="whatsappNumber" defaultValue={ad?.whatsappNumber || ""} />
              </div>
              <div className="col-md-2 mb-4">
                <label className="form-label">&nbsp;</label>
                <button className="admin-btn">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
