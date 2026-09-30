import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/shared/page-hero";
import { site } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Contact",
  "Contact INTERN IN10 about international internships, language training and travel services.",
  "/contact",
);

export default function ContactPage() {
  const mapSrc = site.mapQuery
    ? `https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=14&output=embed`
    : "";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team."
        text="Ask about an industry, a destination, language preparation or travel support. We reply by email."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-[2rem] border border-line bg-white p-6">
          <h2 className="text-xl font-bold text-navy">Contact information</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-muted">Email</dt>
              <dd>
                <a className="font-semibold text-navy" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Phone</dt>
              <dd className="font-semibold text-navy">{site.phoneDisplay || "To be confirmed"}</dd>
            </div>
            <div>
              <dt className="text-muted">Office location</dt>
              <dd className="font-semibold text-navy">{site.address.join(", ") || "To be confirmed"}</dd>
            </div>
          </dl>
          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-background">
            {mapSrc ? (
              <iframe title="Office location map" src={mapSrc} className="h-64 w-full" loading="lazy" />
            ) : (
              <p className="px-4 py-10 text-sm text-muted">A map will appear here once the office location is confirmed.</p>
            )}
          </div>
        </aside>
        <div className="rounded-[2rem] border border-line bg-white p-6 sm:p-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
