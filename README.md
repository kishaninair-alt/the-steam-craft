# The Steam Craft

Kerala idli, tomato-coconut chutney, and idli batter — steamed fresh from a home kitchen in
Ahmedabad. Family-run: Kishan invests, his mom (a Panicker, married into the Nair family) runs
the kitchen.

Two separate apps, one shared Supabase project:

- **`web/`** — the public promo site. Tells the story, shows the menu, links out to Zomato/Swiggy
  for actual ordering, and captures leads for batter subscriptions and catering.
- **`admin/`** — internal ops only, password-gated. Daily order ledger, batter batch tracker,
  inventory, kitchen-help hours, expenses, and the leads captured by the web app.

## Why two apps, one database

Zomato and Swiggy remain the real order-taking systems — this project doesn't try to replace
them. `web/` is marketing plus lead capture; `admin/` is the operational cockpit you and your mom
check once a day. Both point at the same Supabase project so a lead captured on the website shows
up in the admin app immediately, but each app's Supabase key is scoped to what it actually needs:
`web/` can only ever insert into `leads` (via its one API route), `admin/` can read/write
everything else.

## First-time setup

1. **Create one Supabase project** for both apps (Settings → API to get your URL, anon key isn't
   used by either app, and the `service_role` key — keep that one secret).
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor. This creates
   `leads`, `orders`, `batter_batches`, `inventory_items`, `staff_shifts`, `expenses` — all with
   RLS on and no public policies, since every read/write goes through a server using the
   service-role key.
3. Set up each app — see `web/README.md` and `admin/README.md` for the specifics.
4. Deploy each as its own Vercel project (two separate `vercel` projects pointing at the same
   repo's `web/` and `admin/` subfolders, or two separate repos if you'd rather keep them fully
   apart).

## What's still manual (by design, for now)

- Taking and fulfilling orders — that's Zomato/Swiggy's job.
- Payments — no checkout is built here; customers pay Zomato/Swiggy directly, or you handle
  subscriptions/catering payments however you and your mom prefer for now (UPI/cash), and just
  log the resulting order in `admin/orders`.
- The actual brand logo and animation — see the Claude-design prompts you already have; drop the
  final logo files into `web/public/` once you've generated them (favicon, and an
  `icon-192.png` / `icon-512.png` pair if you want the site installable like Page 27's PWA setup).
