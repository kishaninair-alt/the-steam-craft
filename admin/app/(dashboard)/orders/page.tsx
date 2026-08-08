import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function addOrder(formData: FormData) {
  "use server";
  const supabase = createServiceClient();
  await supabase.from("orders").insert({
    order_date: formData.get("order_date"),
    platform: formData.get("platform"),
    items: formData.get("items"),
    quantity: Number(formData.get("quantity")),
    amount: Number(formData.get("amount")),
    status: formData.get("status"),
    note: formData.get("note") || null,
  });
  revalidatePath("/orders");
}

export default async function OrdersPage() {
  const supabase = createServiceClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("order_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(100);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <h1 className="font-serif text-2xl text-espresso">Orders</h1>
      <p className="mt-1 text-sm text-espresso/60">
        Manual log across Zomato, Swiggy, and direct orders — the platforms remain the actual
        order system, this is just your daily ledger.
      </p>

      <form action={addOrder} className="mt-6 grid gap-3 rounded-lg border border-espresso/10 bg-white p-5 sm:grid-cols-3">
        <input type="date" name="order_date" defaultValue={today} required className="input" />
        <select name="platform" required defaultValue="zomato" className="input">
          <option value="zomato">Zomato</option>
          <option value="swiggy">Swiggy</option>
          <option value="direct">Direct</option>
        </select>
        <select name="status" required defaultValue="completed" className="input">
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
        <input name="items" placeholder="Items (e.g. 2x Idli Chutney, 1x Batter 1kg)" required className="input sm:col-span-3" />
        <input type="number" name="quantity" placeholder="Quantity" defaultValue={1} min={1} required className="input" />
        <input type="number" name="amount" placeholder="Amount (₹)" step="0.01" required className="input" />
        <input name="note" placeholder="Note (optional)" className="input" />
        <button type="submit" className="btn sm:col-span-3">Add order</button>
      </form>

      <div className="mt-8 overflow-x-auto rounded-lg border border-espresso/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-espresso/10 text-left text-espresso/50">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).map((o) => (
              <tr key={o.id} className="border-b border-espresso/5">
                <td className="px-4 py-3">{o.order_date}</td>
                <td className="px-4 py-3 capitalize">{o.platform}</td>
                <td className="px-4 py-3">{o.items}</td>
                <td className="px-4 py-3">{o.quantity}</td>
                <td className="px-4 py-3">₹{Number(o.amount).toFixed(0)}</td>
                <td className="px-4 py-3 capitalize">{o.status}</td>
              </tr>
            ))}
            {(!orders || orders.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-espresso/40">
                  No orders logged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
