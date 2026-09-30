import { InternshipExplorer } from "@/components/internships/explorer";
import { PageHero } from "@/components/shared/page-hero";
import { getInternships } from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Internships",
  "Browse international internship opportunities in hospitality, healthcare, tourism and business. Availability varies by destination and eligibility.",
  "/internships",
);

export const dynamic = "force-dynamic";

export default async function InternshipsPage() {
  const listings = await getInternships();
  return (
    <>
      <PageHero
        eyebrow="Internships"
        title="Current internship directions."
        text="Browse current internship directions in hospitality, healthcare, tourism, international business and other professional sectors. Availability varies by destination and eligibility."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <InternshipExplorer listings={listings} />
      </section>
    </>
  );
}
