import { PageHero, Prose } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Terms & Conditions",
  "Terms for using the INTERN IN10 website, application form and related flagship information.",
  "/terms",
);

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" text="The limits of what this website offers." />
      <Prose>
        <p>
          INTERN IN10 provides information about international internship opportunities and a way to submit your interest. Listings describe possible directions. They are not offers of employment, admission or sponsorship.
        </p>
        <p>
          Submitting an application does not guarantee an internship, a visa, a job or a salary. Eligibility depends on the candidate, the destination, the host and current availability.
        </p>
        <p>
          Lord of Languages is a language-training flagship. Fly Maverick is a travel-services flagship and does not provide visa processing on this website.
        </p>
        <p>You agree to provide accurate information and a resume you have the right to share. We may decline or pause a review when requirements are not met.</p>
      </Prose>
    </>
  );
}
