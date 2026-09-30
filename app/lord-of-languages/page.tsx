import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen, GraduationCap, Languages, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { languagePrograms } from "@/lib/data/content";
import { photos } from "@/lib/data/photos";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Lord of Languages",
  "Language and test preparation including German, IELTS, TOEFL, OET, PET, PTE and additional programs.",
  "/lord-of-languages",
);

const icons = [Languages, GraduationCap, BookOpen, Stethoscope, BookOpen, GraduationCap, Languages] as const;

export default function LordOfLanguagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Lord of Languages"
        title="Language & Test Preparation."
        text="Lord of Languages provides language training and English-test preparation for candidates who need it before an international internship, study or career step. Requirements vary by destination, program and institution."
      />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-[2rem]">
          <Image src={photos.language} alt="Student studying with notes" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-navy">Training aligned to your destination</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Germany may call for German. English-speaking destinations may call for IELTS, TOEFL, PTE or another assessment where an institution asks for it. Healthcare pathways may involve OET. Lord of Languages does not treat one exam as mandatory for every country.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/contact">Explore Language Training</Link>
          </Button>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-purple">Language & Test Preparation</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy">Programs</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {languagePrograms.map((item, index) => {
            const Icon = icons[index] ?? Languages;
            return (
              <Link
                key={item.slug}
                href={`#${item.slug}`}
                className="group rounded-3xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <Icon className="size-6 text-brand-purple" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold text-navy">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                  Learn More
                  <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="mx-auto max-w-7xl space-y-4 px-4 pb-16 sm:px-6">
        {languagePrograms.map((item) => (
          <article key={item.slug} id={item.slug} className="scroll-mt-28 rounded-3xl border border-line bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-navy">{item.name}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
            <Button className="mt-5" variant="outline" asChild>
              <Link href="/contact">Enquire about this program</Link>
            </Button>
          </article>
        ))}
      </section>
    </>
  );
}
