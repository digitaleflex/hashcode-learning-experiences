import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/auth/admin";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!verifyAdminToken(token)) redirect("/admin/login");

  return (
    <main className="session">
      <div>
        <div className="session-brand">HASHCODE SESSIONS · ADMIN</div>
        <h1>TABLEAU DE <span>CONTRÔLE.</span></h1>
        <p>Gère les sessions et pilote les interactions en direct.</p>
        <div className="actions">
          <Link className="primary" href="/admin/presenter/session-01">PILOTER SESSION 01</Link>
          <Link className="secondary" href="/s/session-01">VOIR LA SESSION PUBLIQUE</Link>
        </div>
      </div>
    </main>
  );
}