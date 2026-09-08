export default async function Presenter({ params }: { params: Promise<{ sessionCode: string }> }) {
  const { sessionCode } = await params;
  return (
    <main className="session">
      <div className="session-brand">HASHCODE · PRÉSENTATEUR</div>
      <h1>TABLEAU DE CONTRÔLE.</h1>
      <p>Session : {sessionCode}</p>
      <div className="panel">
        <strong>PROCHAINE ÉTAPE</strong>
        <p>Connecter Supabase Realtime pour piloter les interactions en direct.</p>
      </div>
    </main>
  );
}