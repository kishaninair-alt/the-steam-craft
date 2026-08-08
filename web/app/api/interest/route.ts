import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

const VALID_INTERESTS = ["idli_chutney", "batter_subscription", "catering", "other"];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, interest, note } = body ?? {};

  if (!name || !phone || !VALID_INTERESTS.includes(interest)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("leads").insert({
    name: String(name).slice(0, 200),
    phone: String(phone).slice(0, 40),
    email: email ? String(email).slice(0, 200) : null,
    interest,
    note: note ? String(note).slice(0, 1000) : null,
  });

  if (error) {
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
