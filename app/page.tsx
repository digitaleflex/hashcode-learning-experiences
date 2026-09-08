import Link from "next/link";

export default function Home() {
  return (
    <main className="session">
      <div>
        <div className="session-brand">HASHCODE SESSIONS</div>
        <h1>DES SESSIONS QUI SE <span>VIVENT.</span></h1>
        <p>
          Une plateforme interactive pour les sessions, ateliers, masterclasses
          et expériences technologiques de la communauté HashCode.
        </p>
        <div className="actions">
          <Link className="primary" href="/s/session-01">OUVRIR SESSION 01</Link>
          <Link className="secondary" href="/admin/login">ADMINISTRATION</Link>
        </div>
      </div>
    </main>
  );
}