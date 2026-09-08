import Link from "next/link";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ sessionSlug: string }>;
}) {
  const { sessionSlug } = await params;
  const isSession01 = sessionSlug === "session-01";

  return (
    <main className="session">
      <div>
        <div className="session-brand">HASHCODE SESSIONS · {isSession01 ? "SESSION 01" : sessionSlug.toUpperCase()}</div>
        <h1>{isSession01 ? <>LE TRAVAIL <span>CHANGE.</span></> : <>SESSION <span>BIENTÔT.</span></>}</h1>
        <p>
          {isSession01
            ? "Une immersion interactive sur l'intelligence artificielle, les transformations du travail et les systèmes qui redéfinissent déjà notre manière de créer."
            : "Cette session sera bientôt disponible."}
        </p>
        {isSession01 && (
          <div className="actions">
            <Link className="primary" href="/join/session-01">REJOINDRE LA SESSION</Link>
          </div>
        )}
      </div>
    </main>
  );
}