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
          <p className="mt-5 text-lg leading-relaxed text-espresso/70">
            Steamed idli, tomato-coconut chutney, and batter made the way our family has always
            made it — a few hours a day, from our home kitchen, cooked to order.
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
              My mother runs the kitchen. I handle everything around it. Everything is steamed
              and made fresh in small batches, a few hours a day, with a little help on order-heavy
              days — not mass-produced, not sitting under a heat lamp.
            </p>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-serif text-sm uppercase tracking-widest text-gold-deep">Menu</p>
        <h2 className="mt-3 font-serif text-3xl text-espresso">Made fresh, cooked to order</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-espresso/10 bg-white p-6">
            <h3 className="font-serif text-xl text-espresso">Steamed Idli & Chutney</h3>
            <p className="mt-2 text-sm text-espresso/70">
              Soft-steamed idli served with our tomato-coconut chutney — the combination our
              family has made at home for generations, unchanged.
            </p>
          </div>
          <div className="rounded-lg border border-espresso/10 bg-white p-6">
            <h3 className="font-serif text-xl text-espresso">Extra Chutney</h3>
            <p className="mt-2 text-sm text-espresso/70">
              Love the chutney more than the idli? You can order it on its own, in whatever
              quantity you need.
            </p>
          </div>
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
