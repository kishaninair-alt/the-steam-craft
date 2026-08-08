import { createServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createServiceClient();
  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [ordersToday, batches, lowStock, newLeads] = await Promise.all([
    supabase.from("orders").select("amount, status").eq("order_date", today),
    supabase.from("batter_batches").select("*").gte("expiry_date", today),
    supabase.from("inventory_items").select("*"),
    supabase.from("leads").select("id").gte("created_at", sevenDaysAgo),
  ]);

  const todaysOrders = ordersToday.data ?? [];
  const completedToday = todaysOrders.filter((o) => o.status === "completed");
  const revenueToday = completedToday.reduce((sum, o) => sum + Number(o.amount), 0);

  const batterRemaining = (batches.data ?? []).reduce(
    (sum, b) => sum + (Number(b.quantity_made_kg) - Number(b.quantity_sold_kg)),
    0
  );

  const lowStockItems = (lowStock.data ?? []).filter(
    (i) => Number(i.quantity_on_hand) <= Number(i.low_stock_threshold)
  );

  return (
    <div>
      <h1 className="font-serif text-2xl text-espresso">Dashboard</h1>
      <p className="mt-1 text-sm text-espresso/60">
        {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Orders today" value={completedToday.length} />
        <Stat label="Revenue today" value={`₹${revenueToday.toFixed(0)}`} />
        <Stat label="Batter in stock" value={`${batterRemaining.toFixed(1)} kg`} />
        <Stat label="New leads (7d)" value={newLeads.data?.length ?? 0} />
      </div>

      {lowStockItems.length > 0 && (
        <div className="mt-8 rounded-lg border border-terracotta/30 bg-terracotta/5 p-5">
          <h2 className="font-serif text-lg text-terracotta">Low stock</h2>
          <ul className="mt-2 space-y-1 text-sm text-espresso/80">
            {lowStockItems.map((item) => (
              <li key={item.id}>
                {item.name} — {item.quantity_on_hand} {item.unit} left (reorder below{" "}
                {item.low_stock_threshold} {item.unit})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-espresso/10 bg-white p-5">
      <p className="text-xs uppercase tracking-wide text-espresso/50">{label}</p>
      <p className="mt-2 font-serif text-2xl text-espresso">{value}</p>
    </div>
  );
}
