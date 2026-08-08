import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function addBatch(formData: FormData) {
  "use server";
  const supabase = createServiceClient();
  await supabase.from("batter_batches").insert({
    batch_date: formData.get("batch_date"),
    quantity_made_kg: Number(formData.get("quantity_made_kg")),
    quantity_sold_kg: Number(formData.get("quantity_sold_kg") || 0),
    expiry_date: formData.get("expiry_date"),
    note: formData.get("note") || null,
  });
  revalidatePath("/batter");
}

export default async function BatterPage() {
  const supabase = createServiceClient();
  const { data: batches } = await supabase
    .from("batter_batches")
    .select("*")
    .order("batch_date", { ascending: false })
    .limit(50);

  const today = new Date().toISOString().slice(0, 10);
  const defaultExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  return (
    <div>
      <h1 className="font-serif text-2xl text-espresso">Batter batches</h1>
      <p className="mt-1 text-sm text-espresso/60">
        Track what&apos;s made, what&apos;s sold, and what&apos;s about to expire.
      </p>

      <form action={addBatch} className="mt-6 grid gap-3 rounded-lg border border-espresso/10 bg-white p-5 sm:grid-cols-4">
        <input type="date" name="batch_date" defaultValue={today} required className="input" />
        <input type="number" name="quantity_made_kg" placeholder="Made (kg)" step="0.1" required className="input" />
        <input type="number" name="quantity_sold_kg" placeholder="Sold so far (kg)" step="0.1" defaultValue={0} className="input" />
        <input type="date" name="expiry_date" defaultValue={defaultExpiry} required className="input" />
        <input name="note" placeholder="Note (optional)" className="input sm:col-span-3" />
        <button type="submit" className="btn">Add batch</button>
      </form>

      <div className="mt-8 overflow-x-auto rounded-lg border border-espresso/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-espresso/10 text-left text-espresso/50">
              <th className="px-4 py-3">Batch date</th>
              <th className="px-4 py-3">Made (kg)</th>
              <th className="px-4 py-3">Sold (kg)</th>
              <th className="px-4 py-3">Remaining (kg)</th>
              <th className="px-4 py-3">Expiry</th>
            </tr>
          </thead>
          <tbody>
            {(batches ?? []).map((b) => {
              const remaining = Number(b.quantity_made_kg) - Number(b.quantity_sold_kg);
              const expired = b.expiry_date < today;
              return (
                <tr key={b.id} className={`border-b border-espresso/5 ${expired ? "text-terracotta" : ""}`}>
                  <td className="px-4 py-3">{b.batch_date}</td>
                  <td className="px-4 py-3">{b.quantity_made_kg}</td>
                  <td className="px-4 py-3">{b.quantity_sold_kg}</td>
                  <td className="px-4 py-3">{remaining.toFixed(1)}</td>
                  <td className="px-4 py-3">{b.expiry_date}{expired ? " (expired)" : ""}</td>
                </tr>
              );
            })}
            {(!batches || batches.length === 0) && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-espresso/40">
                  No batches logged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
