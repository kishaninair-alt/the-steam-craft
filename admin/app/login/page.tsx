"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg border border-espresso/10 bg-white p-8">
        <h1 className="font-serif text-2xl text-espresso">The Steam Craft — Ops</h1>
        <p className="mt-1 text-sm text-espresso/60">Internal use only.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="mt-6 w-full rounded-md border border-espresso/20 px-4 py-3 text-sm focus:border-gold focus:outline-none"
        />
        {error && <p className="mt-2 text-sm text-terracotta">Wrong password — try again.</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-md bg-espresso px-4 py-3 text-sm font-medium text-cream-idli hover:bg-terracotta disabled:opacity-60"
        >
          {loading ? "Checking…" : "Log in"}
        </button>
      </form>
    </main>
  );
}
