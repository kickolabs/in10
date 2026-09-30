import { PageHero } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "About",
  "IN10 is an international internship platform connecting candidates with global opportunities across industries and destinations.",
  "/about",
);

const sections = [
  {
    title: "Who we are",
    text: "IN10 is an international internship platform focused on connecting candidates with global internship opportunities across diverse industries and destinations.",
  },
  {
    title: "What IN10 does",
    text: "We help students and professionals discover internships in hospitality, healthcare, tourism, international business and other sectors, then guide them through application and preparation.",
  },
  {
    title: "Our mission",
    text: "Make international internship exploration clear, professional and honest, so candidates can judge fit before they commit time and documents.",
  },
  {
    title: "Our vision",
    text: "A technology-enabled way for candidates to see global training pathways without treating every destination as identical.",
  },
  {
    title: "Our approach",
    text: "List what is relevant, review eligibility carefully, and say when a language, document or host requirement stands in the way.",
  },
  {
    title: "Global opportunity network",
    text: "Destinations include France, Malaysia, Mauritius, Singapore, Australia, New Zealand, Germany, other European countries and Gulf countries. The live set depends on hosts.",
  },
  {
    title: "Candidate support",
    text: "Support covers profile review, document guidance and, where useful, an introduction to language training. It does not include a guaranteed placement.",
  },
  {
    title: "Partner ecosystem",
    text: "Lord of Languages prepares language skills. Fly Maverick arranges travel services such as flights, hotels and tours. Visa processing is not part of this website.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="International internships, explained plainly."
        text="Opportunities depend on candidate eligibility, destination, industry, program availability and employer requirements."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:px-6 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="rounded-3xl border border-line bg-white p-6">
            <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{section.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}
