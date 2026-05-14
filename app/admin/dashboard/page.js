import AdminShell from "@/components/admin/AdminShell";
import { getContact } from "@/lib/data";
import { saveContact } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const contact = await getContact();
  return (
    <AdminShell>
      <div className="container">
        <div className="admin-card"><strong>Contact Manager</strong></div>
        <div className="admin-card">
          <form action={saveContact} className="admin-form">
            <input type="hidden" name="id" defaultValue={contact?._id || ""} />
            <div className="row">
              <div className="col-md-3 mb-4">
                <label className="form-label">Name</label>
                <input name="name" defaultValue={contact?.name || ""} />
              </div>
              <div className="col-md-3 mb-4">
                <label className="form-label">Phone Number</label>
                <input name="contactNumber" defaultValue={contact?.contactNumber || ""} />
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
