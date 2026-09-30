import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { steps } from "@/lib/data/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "How It Works",
  "Explore, choose, apply, assessment, preparation and the internship journey. IN10 does not guarantee placement or visa approval.",
  "/how-it-works",
);

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="A clear path, with limits stated."
        text="The process helps you move from research to preparation. It does not promise placement, a visa or a salary."
      />
      <ol className="mx-auto grid max-w-5xl gap-4 px-4 py-14 sm:px-6">
        {steps.map((step) => (
          <li key={step.number} className="grid gap-4 rounded-3xl border border-line bg-white p-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <p className="text-gradient text-2xl font-extrabold">{step.number}</p>
            <div>
              <h2 className="text-2xl font-bold text-navy">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <Button asChild>
          <Link href="/apply">Apply Now</Link>
        </Button>
      </div>
    </>
  );
}
