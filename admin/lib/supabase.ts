import { createClient } from "@supabase/supabase-js";

// Server-only client, uses the service-role key. This app is already gated
// by the password middleware, so every page can read/write freely through this.
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
