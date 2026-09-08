"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Participant = { displayName: string; sessionCode: string };

export default function Live() {
  const { sessionCode } = useParams<{ sessionCode: string }>();
  const [p, setP] = useState<Participant | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("hashcode-participant");
    if (raw) setP(JSON.parse(raw));
    setNote(localStorage.getItem("hashcode-notes-" + sessionCode) || "");
  }, [sessionCode]);

  if (!p) {
    return <main className="join"><section className="card">Chargement…</section></main>;
  }

  return (
    <main className="join">
      <section className="card">
        <div className="brand">HASHCODE LIVE · CONNECTÉ</div>
        <p className="kicker">BIENVENUE, {p.displayName}</p>
        <h1>TU PARTICIPES À LA SESSION.</h1>
        <p className="muted">Les interactions ouvertes par le présentateur apparaîtront ici en temps réel.</p>
        <div className="section">
          <strong>MON CARNET</strong>
          <textarea rows={7} value={note} onChange={e => setNote(e.target.value)} placeholder="Tes idées, tes apprentissages, tes actions…" />
          <button className="secondary" onClick={() => localStorage.setItem("hashcode-notes-" + sessionCode, note)}>ENREGISTRER MES NOTES</button>
        </div>
        <p className="status">Session : {sessionCode}</p>
      </section>
    </main>
  );
}