"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Accès refusé.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="join">
      <section className="card">
        <div className="brand">HASHCODE SESSIONS</div>
        <p className="kicker">ZONE PRIVÉE</p>
        <h1>ADMINISTRATION.</h1>
        <p className="muted">Accès réservé à l'équipe d'administration.</p>
        <form onSubmit={submit}>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mot de passe administrateur"
            autoFocus
          />
          {error && <p className="error">{error}</p>}
          <button disabled={loading}>{loading ? "VÉRIFICATION…" : "ACCÉDER À L'ADMIN"}</button>
        </form>
      </section>
    </main>
  );
}