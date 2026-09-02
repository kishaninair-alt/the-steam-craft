import SunIdliMark from "@/components/SunIdliMark";
import InterestForm from "@/components/InterestForm";

const ZOMATO_URL = process.env.NEXT_PUBLIC_ZOMATO_URL ?? "https://www.zomato.com/";
const SWIGGY_URL = process.env.NEXT_PUBLIC_SWIGGY_URL ?? "https://www.swiggy.com/";

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-espresso/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <SunIdliMark className="h-8 w-8" />
            <span className="font-serif text-lg tracking-tight text-espresso">The Steam Craft</span>
          </div>
          <nav className="hidden gap-6 text-sm text-espresso/70 sm:flex">
            <a href="#story" className="hover:text-espresso">Our story</a>
            <a href="#menu" className="hover:text-espresso">Menu</a>
            <a href="#batter" className="hover:text-espresso">Batter</a>
            <a href="#contact" className="hover:text-espresso">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 sm:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <SunIdliMark className="mx-auto h-16 w-16" />
          <h1 className="mt-6 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
            Kerala on a plate. Ahmedabad in the address.
          </h1>
          <p className="mt-3 font-serif italic text-terracotta">Soft idlis, bold chutneys.</p>
          <p className="mt-5 text-lg leading-relaxed text-espresso/70">
            Steamed idli, a tray of chutneys, and batter made the way our family has always made
            it — a few hours a day, from our home kitchen, cooked to order.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={ZOMATO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-espresso px-6 py-3 text-sm font-medium text-cream-idli transition hover:bg-terracotta"
            >
              Order on Zomato
            </a>
            <a
              href={SWIGGY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-espresso/20 bg-white px-6 py-3 text-sm font-medium text-espresso transition hover:border-espresso/40"
            >
              Order on Swiggy
            </a>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="border-y border-espresso/10 bg-cream-warm">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="font-serif text-sm uppercase tracking-widest text-gold-deep">Our story</p>
          <h2 className="mt-3 font-serif text-3xl text-espresso">
            We&apos;re not from Kerala. We&apos;re Kerala, from Ahmedabad.
          </h2>
          <div className="mt-6 space-y-4 text-espresso/80">
            <p>
              Our family has been Malayali for generations and Ahmedabadi for just as long — born
              here, raised here, never lived anywhere else. The idli and chutney on this menu
              aren&apos;t a "cuisine we offer." They&apos;re what got made in our kitchen every
              week of our lives, long before there was a business attached to it.
            </p>
            <p>
              The Steam Craft is made and run by the mother of the house — every recipe, every
              batch, every call in the kitchen is hers. The father and children are her helpers
              and her loudest cheerleaders. Everything is steamed and made fresh in small
              batches, a few hours a day, with a little extra help on order-heavy days — not
              mass-produced, not sitting under a heat lamp.
            </p>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-serif text-sm uppercase tracking-widest text-gold-deep">Menu</p>
        <h2 className="mt-3 font-serif text-3xl text-espresso">Made fresh, cooked to order</h2>
        <p className="mt-2 font-serif italic text-terracotta">Three chutneys. Endless cravings.</p>

        {/* Signature chutneys */}
        <div className="mt-8">
          <h3 className="text-sm font-medium uppercase tracking-widest text-espresso/50">
            Our signature chutneys, with every order
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-lg border border-espresso/10 bg-white p-4">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cream-warm border border-espresso/20" />
              <div>
                <p className="text-sm font-medium text-espresso">Classic Coconut</p>
                <p className="mt-1 text-xs text-espresso/60">Fresh, creamy, traditionally tempered.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-espresso/10 bg-white p-4">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-terracotta" />
              <div>
                <p className="text-sm font-medium text-espresso">Onion Tomato</p>
                <p className="mt-1 text-xs text-espresso/60">Onions, tomatoes, and aromatic spices.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-espresso/10 bg-white p-4">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-leaf" />
              <div>
                <p className="text-sm font-medium text-espresso">Coconut Tomato</p>
                <p className="mt-1 text-xs text-espresso/60">Creamy coconut, balanced with tangy tomato.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Idli menu */}
        <div className="mt-10">
          <h3 className="text-sm font-medium uppercase tracking-widest text-espresso/50">Idli menu</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              {
                name: "Classic Idli Box",
                desc: "4 soft & fluffy idlis, served with all 3 signature chutneys.",
                price: 89,
              },
              {
                name: "Mini Idli Box",
                desc: "12 bite-sized baby idlis, served with all 3 signature chutneys.",
                price: 99,
              },
              {
                name: "Podi Baby Idlis",
                desc: "12 mini idlis tossed in aromatic podi, served with coconut chutney.",
                price: 119,
              },
              {
                name: "Ghee Podi Baby Idlis",
                desc: "12 mini idlis tossed in pure ghee & house-special podi, served with coconut chutney.",
                price: 139,
              },
            ].map((item) => (
              <div key={item.name} className="flex items-start justify-between gap-4 rounded-lg border border-espresso/10 bg-white p-5">
                <div>
                  <h4 className="font-serif text-lg text-espresso">{item.name}</h4>
                  <p className="mt-1 text-sm text-espresso/70">{item.desc}</p>
                </div>
                <p className="shrink-0 font-serif text-lg text-espresso">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Combos */}
        <div className="mt-10">
          <h3 className="text-sm font-medium uppercase tracking-widest text-espresso/50">Combos</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start justify-between gap-4 rounded-lg border border-gold/40 bg-cream-idli p-5">
              <div>
                <h4 className="font-serif text-lg text-espresso">The Perfect Combo</h4>
                <p className="mt-1 text-sm text-espresso/70">
                  4 classic idlis + 8 baby idlis, with all 3 signature chutneys.
                </p>
              </div>
              <p className="shrink-0 font-serif text-lg text-espresso">₹149</p>
            </div>
            <div className="flex items-start justify-between gap-4 rounded-lg border border-gold/40 bg-cream-idli p-5">
              <div>
                <h4 className="font-serif text-lg text-espresso">The Family Steam Box</h4>
                <p className="mt-1 text-sm text-espresso/70">
                  8 classic idlis + 24 baby idlis, generous chutneys — perfect for sharing.
                </p>
              </div>
              <p className="shrink-0 font-serif text-lg text-espresso">₹299</p>
            </div>
          </div>
        </div>

        {/* Extras */}
        <div className="mt-10">
          <h3 className="text-sm font-medium uppercase tracking-widest text-espresso/50">Extras</h3>
          <ul className="mt-4 grid gap-2 text-sm text-espresso/80 sm:grid-cols-2">
            <li className="flex items-center justify-between rounded-md border border-espresso/10 bg-white px-4 py-2.5">
              <span>Extra Chutney</span><span className="text-espresso/60">₹20</span>
            </li>
            <li className="flex items-center justify-between rounded-md border border-espresso/10 bg-white px-4 py-2.5">
              <span>Extra Podi</span><span className="text-espresso/60">₹15</span>
            </li>
            <li className="flex items-center justify-between rounded-md border border-espresso/10 bg-white px-4 py-2.5">
              <span>Ghee Topping</span><span className="text-espresso/60">₹20</span>
            </li>
            <li className="flex items-center justify-between rounded-md border border-espresso/10 bg-white px-4 py-2.5">
              <span>All 3 Chutneys — Extra Trio</span><span className="text-espresso/60">₹49</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Batter */}
      <section id="batter" className="border-y border-espresso/10 bg-cream-warm">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="font-serif text-sm uppercase tracking-widest text-gold-deep">By the kilo</p>
          <h2 className="mt-3 font-serif text-3xl text-espresso">Idli batter, sold separately</h2>
          <p className="mt-4 max-w-2xl text-espresso/80">
            If you&apos;d rather steam it yourself, we sell our fermented idli batter directly —
            fresh-ground, properly proofed, ready to steam at home. Good for households that go
            through idli often, or anyone who wants the batter without the delivery box.
          </p>
        </div>
      </section>

      {/* Contact / interest form */}
      <section id="contact" className="mx-auto max-w-2xl px-6 py-16">
        <p className="font-serif text-sm uppercase tracking-widest text-gold-deep">Get in touch</p>
        <h2 className="mt-3 font-serif text-3xl text-espresso">
          Want batter on a regular schedule, or catering for an event?
        </h2>
        <p className="mt-4 text-espresso/70">
          Leave your details below and we&apos;ll call you — day-to-day orders are easiest through
          Zomato or Swiggy, but subscriptions and bulk orders we handle directly.
        </p>
        <div className="mt-8">
          <InterestForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-espresso/10 py-10">
        <div className="mx-auto max-w-5xl px-6 text-sm text-espresso/60">
          <div className="flex items-center gap-2">
            <SunIdliMark className="h-6 w-6" />
            <span className="font-serif text-espresso">The Steam Craft</span>
          </div>
          <p className="mt-3">Ahmedabad, Gujarat — home-kitchen made, delivered fresh.</p>
          <p className="mt-1">FSSAI License No: [add license number]</p>
        </div>
      </footer>
    </main>
  );
}
