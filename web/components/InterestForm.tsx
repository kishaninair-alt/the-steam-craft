"use client";

import { useState } from "react";

const INTERESTS = [
  { value: "idli_chutney", label: "Idli & chutney orders" },
  { value: "batter_subscription", label: "Batter subscription (regular supply)" },
  { value: "catering", label: "Catering / bulk order" },
  { value: "other", label: "Something else" },
];

export default function InterestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      interest: form.get("interest"),
      note: form.get("note"),
    };
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-gold/30 bg-cream-idli p-6 text-center">
        <p className="font-serif text-lg text-espresso">Got it — we&apos;ll reach out.</p>
        <p className="mt-1 text-sm text-espresso/70">
          Usually within a day. Thanks for your patience while we&apos;re still small.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <input
        name="name"
        required
        placeholder="Your name"
        className="rounded-md border border-espresso/20 bg-white px-4 py-3 text-sm placeholder:text-espresso/40 focus:border-gold focus:outline-none"
      />
      <input
        name="phone"
        required
        placeholder="Phone number"
        className="rounded-md border border-espresso/20 bg-white px-4 py-3 text-sm placeholder:text-espresso/40 focus:border-gold focus:outline-none"
      />
      <input
        name="email"
        type="email"
        placeholder="Email (optional)"
        className="rounded-md border border-espresso/20 bg-white px-4 py-3 text-sm placeholder:text-espresso/40 focus:border-gold focus:outline-none sm:col-span-2"
      />
      <select
        name="interest"
        required
        defaultValue=""
        className="rounded-md border border-espresso/20 bg-white px-4 py-3 text-sm text-espresso/80 focus:border-gold focus:outline-none sm:col-span-2"
      >
        <option value="" disabled>
          What are you interested in?
        </option>
        {INTERESTS.map((i) => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
      </select>
      <textarea
        name="note"
        placeholder="Anything else we should know? (area, quantity, frequency)"
        rows={3}
        className="rounded-md border border-espresso/20 bg-white px-4 py-3 text-sm placeholder:text-espresso/40 focus:border-gold focus:outline-none sm:col-span-2"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-espresso px-6 py-3 text-sm font-medium text-cream-idli transition hover:bg-terracotta disabled:opacity-60 sm:col-span-2"
      >
        {status === "sending" ? "Sending…" : "Get in touch"}
      </button>
      {status === "error" && (
        <p className="text-sm text-terracotta sm:col-span-2">
          Something went wrong — mind trying again, or just call us directly?
        </p>
      )}
    </form>
  );
}
