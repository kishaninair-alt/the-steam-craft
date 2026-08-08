import { createServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const INTEREST_LABELS: Record<string, string> = {
  idli_chutney: "Idli & chutney",
  batter_subscription: "Batter subscription",
  catering: "Catering / bulk",
  other: "Other",
};

export default async function LeadsPage() {
  const supabase = createServiceClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="font-serif text-2xl text-espresso">Leads</h1>
      <p className="mt-1 text-sm text-espresso/60">
        People who left their details on the website — call these back yourself.
      </p>

      <div className="mt-8 overflow-x-auto rounded-lg border border-espresso/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-espresso/10 text-left text-espresso/50">
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Interested in</th>
              <th className="px-4 py-3">Note</th>
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((l) => (
              <tr key={l.id} className="border-b border-espresso/5">
                <td className="px-4 py-3">{new Date(l.created_at).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3">{l.name}</td>
                <td className="px-4 py-3">{l.phone}</td>
                <td className="px-4 py-3">{l.email ?? "—"}</td>
                <td className="px-4 py-3">{INTEREST_LABELS[l.interest] ?? l.interest}</td>
                <td className="px-4 py-3 text-espresso/60">{l.note}</td>
              </tr>
            ))}
            {(!leads || leads.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-espresso/40">
                  No leads yet — they&apos;ll show up here as soon as someone fills the form on the site.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
