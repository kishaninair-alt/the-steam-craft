import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const CATEGORIES = ["ingredients", "packaging", "staff", "platform_fees", "delivery", "utilities", "other"];

async function addExpense(formData: FormData) {
  "use server";
  const supabase = createServiceClient();
  await supabase.from("expenses").insert({
    expense_date: formData.get("expense_date"),
    category: formData.get("category"),
    amount: Number(formData.get("amount")),
    note: formData.get("note") || null,
  });
  revalidatePath("/expenses");
}

export default async function ExpensesPage() {
  const supabase = createServiceClient();
  const { data: expenses } = await supabase
    .from("expenses")
    .select("*")
    .order("expense_date", { ascending: false })
    .limit(100);

  const today = new Date().toISOString().slice(0, 10);
  const totalThisMonth = (expenses ?? [])
    .filter((e) => e.expense_date.slice(0, 7) === today.slice(0, 7))
    .reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div>
      <h1 className="font-serif text-2xl text-espresso">Expenses</h1>
      <p className="mt-1 text-sm text-espresso/60">
        This month so far: <span className="font-medium text-espresso">₹{totalThisMonth.toFixed(0)}</span>
      </p>

      <form action={addExpense} className="mt-6 grid gap-3 rounded-lg border border-espresso/10 bg-white p-5 sm:grid-cols-4">
        <input type="date" name="expense_date" defaultValue={today} required className="input" />
        <select name="category" required defaultValue="ingredients" className="input">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.replace("_", " ")}
            </option>
          ))}
        </select>
        <input type="number" name="amount" placeholder="Amount (₹)" step="0.01" required className="input" />
        <input name="note" placeholder="Note (optional)" className="input" />
        <button type="submit" className="btn sm:col-span-4">Add expense</button>
      </form>

      <div className="mt-8 overflow-x-auto rounded-lg border border-espresso/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-espresso/10 text-left text-espresso/50">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Note</th>
            </tr>
          </thead>
          <tbody>
            {(expenses ?? []).map((e) => (
              <tr key={e.id} className="border-b border-espresso/5">
                <td className="px-4 py-3">{e.expense_date}</td>
                <td className="px-4 py-3 capitalize">{e.category.replace("_", " ")}</td>
                <td className="px-4 py-3">₹{Number(e.amount).toFixed(0)}</td>
                <td className="px-4 py-3 text-espresso/60">{e.note}</td>
              </tr>
            ))}
            {(!expenses || expenses.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-espresso/40">
                  No expenses logged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
