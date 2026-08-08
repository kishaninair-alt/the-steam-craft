import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function addShift(formData: FormData) {
  "use server";
  const supabase = createServiceClient();
  await supabase.from("staff_shifts").insert({
    staff_name: formData.get("staff_name"),
    shift_date: formData.get("shift_date"),
    hours: Number(formData.get("hours")),
    hourly_rate: Number(formData.get("hourly_rate")),
    note: formData.get("note") || null,
  });
  revalidatePath("/staff");
}

export default async function StaffPage() {
  const supabase = createServiceClient();
  const { data: shifts } = await supabase
    .from("staff_shifts")
    .select("*")
    .order("shift_date", { ascending: false })
    .limit(100);

  const today = new Date().toISOString().slice(0, 10);
  const totalThisMonth = (shifts ?? [])
    .filter((s) => s.shift_date.slice(0, 7) === today.slice(0, 7))
    .reduce((sum, s) => sum + Number(s.hours) * Number(s.hourly_rate), 0);

  return (
    <div>
      <h1 className="font-serif text-2xl text-espresso">Kitchen help</h1>
      <p className="mt-1 text-sm text-espresso/60">
        This month so far: <span className="font-medium text-espresso">₹{totalThisMonth.toFixed(0)}</span>
      </p>

      <form action={addShift} className="mt-6 grid gap-3 rounded-lg border border-espresso/10 bg-white p-5 sm:grid-cols-4">
        <input name="staff_name" placeholder="Name" required className="input" />
        <input type="date" name="shift_date" defaultValue={today} required className="input" />
        <input type="number" name="hours" placeholder="Hours" step="0.5" required className="input" />
        <input type="number" name="hourly_rate" placeholder="Rate per hour (₹)" step="1" required className="input" />
        <input name="note" placeholder="Note (optional)" className="input sm:col-span-3" />
        <button type="submit" className="btn">Add shift</button>
      </form>

      <div className="mt-8 overflow-x-auto rounded-lg border border-espresso/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-espresso/10 text-left text-espresso/50">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Hours</th>
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {(shifts ?? []).map((s) => (
              <tr key={s.id} className="border-b border-espresso/5">
                <td className="px-4 py-3">{s.shift_date}</td>
                <td className="px-4 py-3">{s.staff_name}</td>
                <td className="px-4 py-3">{s.hours}</td>
                <td className="px-4 py-3">₹{s.hourly_rate}</td>
                <td className="px-4 py-3">₹{(Number(s.hours) * Number(s.hourly_rate)).toFixed(0)}</td>
              </tr>
            ))}
            {(!shifts || shifts.length === 0) && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-espresso/40">
                  No shifts logged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
