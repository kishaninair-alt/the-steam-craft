# The Steam Craft — web

Public promo site. Story, menu, links out to Zomato/Swiggy, and a lead-capture form for batter
subscriptions and catering.

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — same Supabase project as `admin/`
  (see the root README). This app only ever inserts into the `leads` table, via
  `app/api/interest/route.ts` — nothing is queried from the browser.
- `NEXT_PUBLIC_ZOMATO_URL` / `NEXT_PUBLIC_SWIGGY_URL` — set these to your actual restaurant page
  on each platform once you're onboarded. Until then the buttons fall back to the generic
  Zomato/Swiggy homepages.

```bash
npm run dev      # http://localhost:3000
npm run build    # sanity check before deploying
```

## Deploying

Push to GitHub, import into Vercel as its own project rooted at `web/` (Vercel project settings →
Root Directory), paste in the env vars above, deploy. Point your domain (once you've bought one)
at this Vercel project.

## To do before this feels finished

- Drop in the real logo once you've generated it from the Claude-design prompts — replace
  `components/SunIdliMark.tsx` (currently a hand-coded placeholder in the same style) with an
  `<img>`/`<Image>` pointing at the final SVG/PNG, plus a favicon and `public/manifest.json` if
  you want it installable.
- Real food photography — swap the text-only menu cards for photos once you have them; this
  matters a lot for conversion on Zomato/Swiggy too, so get the same shoot to cover both.
- Add your actual FSSAI license number in the footer (`app/page.tsx`) once you've got it in hand.
