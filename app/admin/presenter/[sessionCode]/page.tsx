import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/auth/admin";

export default async function AdminPresenter({
  params,
}: {
  params: Promise<{ sessionCode: string }>;
}) {
  const { sessionCode } = await params;
  const cookieStore = await cookies();

  if (!verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  return (
    <main className="session">
      <div>
        <div className="session-brand">HASHCODE SESSIONS · PRÉSENTATEUR</div>
        <h1>SESSION <span>EN DIRECT.</span></h1>
        <p>Session active : {sessionCode}</p>
        <div className="panel">
          <strong>TABLEAU DE CONTRÔLE</strong>
          <p>Le pilotage temps réel des interactions sera connecté à Supabase ici.</p>
        </div>
      </div>
    </main>
  );
}