import { DestinationCard } from "@/components/cards/cards";
import { PageHero } from "@/components/shared/page-hero";
import { getDestinations } from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Destinations",
  "Explore internship destinations including France, Malaysia, Mauritius, Singapore, Australia, New Zealand, Germany, Europe and the Gulf.",
  "/destinations",
);

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  const items = await getDestinations();
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Where internships may take you."
        text="Each destination has its own sectors and language considerations. Available opportunities may vary."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <DestinationCard key={item.slug} item={item} />
        ))}
      </section>
    </>
  );
}
