import { IndustryCard } from "@/components/cards/cards";
import { PageHero } from "@/components/shared/page-hero";
import { industries } from "@/lib/data/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Industries",
  "Hospitality, healthcare, tourism, international business and other professional internship sectors with IN10.",
  "/industries",
);

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Sectors with international training value."
        text="Start from the field you study. Listings inside each sector change with hosts and seasons."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 lg:grid-cols-2">
        {industries.map((item) => (
          <IndustryCard key={item.slug} {...item} />
        ))}
      </section>
    </>
  );
}
