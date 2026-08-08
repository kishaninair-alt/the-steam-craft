"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/orders", label: "Orders" },
  { href: "/batter", label: "Batter" },
  { href: "/inventory", label: "Inventory" },
  { href: "/staff", label: "Staff" },
  { href: "/expenses", label: "Expenses" },
  { href: "/leads", label: "Leads" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-espresso/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <span className="font-serif text-lg text-espresso">The Steam Craft — Ops</span>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 transition ${
                pathname === link.href
                  ? "bg-espresso text-cream-idli"
                  : "text-espresso/70 hover:bg-cream-warm"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="ml-2 rounded-md px-3 py-2 text-sm text-espresso/50 hover:bg-cream-warm hover:text-espresso"
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
