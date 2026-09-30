import Link from "next/link";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { DestinationCard, IndustryCard } from "@/components/cards/cards";
import { AnimatedSection, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { destinations, industries, languagePrograms, reasons, steps } from "@/lib/data/content";
import { site } from "@/lib/site";

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="glow-orb -left-20 top-10 size-72 bg-brand-blue/20" />
        <div className="glow-orb right-0 top-24 size-72 bg-brand-orange/20" />
        <div className="relative mx-auto max-w-4xl px-4 pb-4 pt-16 text-center sm:px-6 sm:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-purple">{site.brand}</p>
          <h1 className="mt-4 text-[2.4rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Build Your Global Career Through <span className="text-gradient">International Internships.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Discover international internship opportunities across hospitality, healthcare, tourism and other professional sectors — and take your first step toward global exposure.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/internships">Explore Internships</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted">Opportunities may vary by destination, eligibility and current availability.</p>
        </div>
        <HeroCarousel />
      </section>

      <AnimatedSection className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-24 sm:px-6 lg:grid-cols-2">
        <SectionHeading
          eyebrow="About IN10"
          title="A platform for international internship opportunities."
          text="IN10 connects students and candidates with internship opportunities across countries and industries. The right opening depends on your profile, the destination and what hosts currently offer."
        />
        <GlassCard className="p-8">
          <p className="text-sm leading-7 text-muted">
            We help you explore hospitality, healthcare, tourism, international business and other professional sectors. Language preparation sits with Lord of Languages. Travel arrangements sit with Fly Maverick.
          </p>
          <Button className="mt-6" variant="navy" asChild>
            <Link href="/about">About the company</Link>
          </Button>
        </GlassCard>
      </AnimatedSection>

      <AnimatedSection className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Industries" title="Internship categories" text="Choose a field that fits your studies. Each category opens into current listings." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((item) => (
              <IndustryCard key={item.slug} {...item} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Destinations" title="Popular destinations" text="A starting map, not a promise that every country has every program right now." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {destinations.slice(0, 6).map((item) => (
            <DestinationCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="mt-8">
          <Button variant="outline" asChild>
            <Link href="/destinations">View all destinations</Link>
          </Button>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-navy py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why IN10" title="Guidance without exaggerated claims." />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((item) => (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Process" title="How it works" text="Six steps from browsing to preparation. Placement and visas are never guaranteed." />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="rounded-3xl border border-line bg-white p-6">
              <p className="text-gradient text-sm font-bold tracking-[0.18em]">{step.number}</p>
              <h3 className="mt-3 text-xl font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <Button className="mt-8" variant="outline" asChild>
          <Link href="/how-it-works">See the full process</Link>
        </Button>
      </AnimatedSection>

      <AnimatedSection className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Language support"
              title="Language & Test Preparation."
              text="International opportunities may require language proficiency or an English test, depending on the destination and program. Lord of Languages provides that preparation. Requirements vary by destination, program and institution."
            />
            <Button className="mt-8" asChild>
              <Link href="/lord-of-languages">Explore Language Training</Link>
            </Button>
          </div>
          <ul className="grid gap-3">
            {languagePrograms.map((item) => (
              <li key={item.slug}>
                <Link href={`/lord-of-languages#${item.slug}`} className="block rounded-2xl border border-line bg-background px-5 py-4 transition hover:border-brand-blue/30">
                  <p className="font-semibold text-navy">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">{item.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto grid max-w-7xl gap-5 px-4 py-24 sm:px-6 md:grid-cols-2">
        <article className="rounded-[2rem] border border-line bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple">Flagship</p>
          <h2 className="mt-3 text-3xl font-bold text-navy">Lord of Languages</h2>
          <p className="mt-3 text-sm leading-6 text-muted">German language training plus IELTS, TOEFL, OET, PET, PTE and additional language and test-preparation programs.</p>
          <Button className="mt-6" variant="outline" asChild>
            <Link href="/lord-of-languages">Explore Language Training</Link>
          </Button>
        </article>
        <article className="rounded-[2rem] border border-line bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">Flagship</p>
          <h2 className="mt-3 text-3xl font-bold text-navy">Fly Maverick</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Fly Maverick supports your travel arrangements with flight bookings, hotel reservations and selected travel services.</p>
          <Button className="mt-6" variant="outline" asChild>
            <Link href="/fly-maverick">Explore Travel Services</Link>
          </Button>
        </article>
      </AnimatedSection>

      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
          <div className="bg-brand-gradient rounded-[2rem] p-8 text-white md:p-10">
            <h2 className="text-3xl font-bold">Ready to explore an internship?</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/85">Share your profile. The team reviews it against programs that are actually open.</p>
            <Button className="mt-6 bg-white text-navy hover:bg-white" variant="outline" asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
          <div className="rounded-[2rem] border border-line bg-white p-8 md:p-10">
            <h2 className="text-3xl font-bold text-navy">Talk with the team</h2>
            <p className="mt-3 text-sm leading-6 text-muted">Questions about destinations, industries or language preparation can start with a message.</p>
            <Button className="mt-6" variant="navy" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
