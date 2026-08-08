-- The Steam Craft — shared Supabase schema
-- One project, used by both apps:
--   web/   (public promo site) -> only ever writes to `leads`, via service-role key in an API route
--   admin/ (internal ops)      -> reads/writes everything, via service-role key
--
-- RLS is ON everywhere with no public policies. All access goes through
-- the service-role key server-side — nothing is ever queried from the browser directly.

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- leads: interest captured from the promo site (batter subscription, catering, etc.)
-- ---------------------------------------------------------------------------
create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  interest text not null check (interest in ('idli_chutney', 'batter_subscription', 'catering', 'other')),
  note text,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

-- ---------------------------------------------------------------------------
-- orders: manual consolidated log of orders across Zomato, Swiggy, and direct/walk-in
-- (Zomato/Swiggy remain the actual order-taking systems — this is just the daily ledger)
-- ---------------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_date date not null default current_date,
  platform text not null check (platform in ('zomato', 'swiggy', 'direct')),
  items text not null,
  quantity integer not null default 1,
  amount numeric(10, 2) not null,
  status text not null default 'completed' check (status in ('completed', 'cancelled', 'refunded')),
  note text,
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

-- ---------------------------------------------------------------------------
-- batter_batches: idli batter production/sale tracking (perishable, needs shelf-life visibility)
-- ---------------------------------------------------------------------------
create table if not exists batter_batches (
  id uuid primary key default uuid_generate_v4(),
  batch_date date not null default current_date,
  quantity_made_kg numeric(6, 2) not null,
  quantity_sold_kg numeric(6, 2) not null default 0,
  expiry_date date not null,
  note text,
  created_at timestamptz not null default now()
);

alter table batter_batches enable row level security;

-- ---------------------------------------------------------------------------
-- inventory_items: raw material stock (rice, urad dal, tomato, coconut, packaging, etc.)
-- ---------------------------------------------------------------------------
create table if not exists inventory_items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  unit text not null default 'kg',
  quantity_on_hand numeric(8, 2) not null default 0,
  low_stock_threshold numeric(8, 2) not null default 0,
  updated_at timestamptz not null default now()
);

alter table inventory_items enable row level security;

-- ---------------------------------------------------------------------------
-- staff_shifts: kitchen help hours/pay log
-- ---------------------------------------------------------------------------
create table if not exists staff_shifts (
  id uuid primary key default uuid_generate_v4(),
  staff_name text not null,
  shift_date date not null default current_date,
  hours numeric(4, 2) not null,
  hourly_rate numeric(8, 2) not null,
  note text,
  created_at timestamptz not null default now()
);

alter table staff_shifts enable row level security;

-- ---------------------------------------------------------------------------
-- expenses: simple running expense log
-- ---------------------------------------------------------------------------
create table if not exists expenses (
  id uuid primary key default uuid_generate_v4(),
  expense_date date not null default current_date,
  category text not null check (category in ('ingredients', 'packaging', 'staff', 'platform_fees', 'delivery', 'utilities', 'other')),
  amount numeric(10, 2) not null,
  note text,
  created_at timestamptz not null default now()
);

alter table expenses enable row level security;

create index if not exists idx_orders_date on orders (order_date desc);
create index if not exists idx_batter_batches_date on batter_batches (batch_date desc);
create index if not exists idx_staff_shifts_date on staff_shifts (shift_date desc);
create index if not exists idx_expenses_date on expenses (expense_date desc);
create index if not exists idx_leads_created on leads (created_at desc);
