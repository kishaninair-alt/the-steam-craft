import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function upsertItem(formData: FormData) {
  "use server";
  const supabase = createServiceClient();
  const id = formData.get("id");
  const payload = {
    name: formData.get("name"),
    unit: formData.get("unit"),
    quantity_on_hand: Number(formData.get("quantity_on_hand")),
    low_stock_threshold: Number(formData.get("low_stock_threshold")),
    updated_at: new Date().toISOString(),
  };
  if (id) {
    await supabase.from("inventory_items").update(payload).eq("id", id);
  } else {
    await supabase.from("inventory_items").insert(payload);
  }
  revalidatePath("/inventory");
}

export default async function InventoryPage() {
  const supabase = createServiceClient();
  const { data: items } = await supabase
    .from("inventory_items")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div>
      <h1 className="font-serif text-2xl text-espresso">Inventory</h1>
      <p className="mt-1 text-sm text-espresso/60">
        Rice, urad dal, tomato, coconut, packaging — whatever you want to keep an eye on.
      </p>

      <form action={upsertItem} className="mt-6 grid gap-3 rounded-lg border border-espresso/10 bg-white p-5 sm:grid-cols-4">
        <input name="name" placeholder="Item name" required className="input" />
        <input name="unit" placeholder="Unit (kg, litre, pcs)" defaultValue="kg" required className="input" />
        <input type="number" name="quantity_on_hand" placeholder="Quantity on hand" step="0.1" required className="input" />
        <input type="number" name="low_stock_threshold" placeholder="Low-stock alert below" step="0.1" required className="input" />
        <button type="submit" className="btn sm:col-span-4">Add item</button>
      </form>

      <div className="mt-8 overflow-x-auto rounded-lg border border-espresso/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-espresso/10 text-left text-espresso/50">
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">On hand</th>
              <th className="px-4 py-3">Low-stock alert</th>
              <th className="px-4 py-3">Update</th>
            </tr>
          </thead>
          <tbody>
            {(items ?? []).map((item) => {
              const low = Number(item.quantity_on_hand) <= Number(item.low_stock_threshold);
              return (
                <tr key={item.id} className={`border-b border-espresso/5 ${low ? "bg-terracotta/5" : ""}`}>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.quantity_on_hand} {item.unit}</td>
                  <td className="px-4 py-3">{item.low_stock_threshold} {item.unit}</td>
                  <td className="px-4 py-3">
                    <form action={upsertItem} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="name" value={item.name} />
                      <input type="hidden" name="unit" value={item.unit} />
                      <input type="hidden" name="low_stock_threshold" value={item.low_stock_threshold} />
                      <input
                        type="number"
                        name="quantity_on_hand"
                        defaultValue={item.quantity_on_hand}
                        step="0.1"
                        className="input w-24"
                      />
                      <button type="submit" className="btn">Save</button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {(!items || items.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-espresso/40">
                  No inventory items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
