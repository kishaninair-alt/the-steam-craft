# The Steam Craft — admin

Internal ops only. Password-gated (one shared password for you and your mom — no user accounts,
no Supabase Auth, this is a two-person app).

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — same Supabase project as `web/`.
  This app has full read/write access, so treat the service-role key like a password — it's
  server-only, never sent to the browser.
- `ADMIN_PASSWORD` — whatever you and your mom agree on.
- `ADMIN_SESSION_SECRET` — generate once with `openssl rand -hex 32`, paste it in, never share it.

```bash
npm run dev      # http://localhost:3001 (runs on 3001 so it doesn't clash with web/ on 3000)
npm run build    # sanity check before deploying
```

## What's in here

- **Dashboard** — today's order count/revenue, batter remaining, low-stock alerts, new leads.
- **Orders** — manual daily ledger across Zomato/Swiggy/direct. The platforms remain the actual
  order system; this is just so you have one place to see the whole day.
- **Batter** — batch-by-batch tracker: made, sold, remaining, expiry (flags expired batches).
- **Inventory** — raw materials with a low-stock threshold per item.
- **Staff** — kitchen-help hours and pay, with a running month-to-date total.
- **Expenses** — simple categorized expense log, month-to-date total.
- **Leads** — read-only feed of everyone who filled the interest form on the website.

## Deploying

Same pattern as `web/` — its own Vercel project rooted at `admin/`, with its own env vars. Keep
this one's URL out of anywhere public (don't link to it from the promo site); the password gate
is enough for a two-person tool, but there's no reason to advertise the URL either.

## To do as the business grows

- If you ever add a third person to operations, swap the shared-password gate for real
  per-person logins (Supabase Auth magic-link, same pattern Page 27 uses) so you can tell who
  logged what.
- Right now every order has to be typed in by hand from the Zomato/Swiggy apps. If that becomes
  a bottleneck, Zomato and Swiggy both have partner APIs/webhooks that could feed `orders`
  automatically — worth revisiting once order volume makes manual entry painful.
