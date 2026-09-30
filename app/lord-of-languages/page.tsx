import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { languagePrograms } from "@/lib/data/content";
import { photos } from "@/lib/data/photos";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Lord of Languages",
  "German, English, IELTS preparation and communication training for international education, internship and career plans.",
  "/lord-of-languages",
);

export default function LordOfLanguagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Lord of Languages"
        title="Prepare your language. Prepare your global journey."
        text="Language training for candidates who need it before an international education, internship or career step. Requirements vary by destination, program and institution."
      />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-[2rem]">
          <Image src={photos.language} alt="Student studying with notes" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-navy">Training that follows the destination</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Germany may call for German. English-speaking destinations may call for English or IELTS where an institution asks for it. Lord of Languages does not treat one exam as mandatory for every country.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/contact">Explore Language Training</Link>
          </Button>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {languagePrograms.map((item) => (
          <article key={item.name} className="rounded-3xl border border-line bg-white p-6">
            <h3 className="text-xl font-bold text-navy">{item.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}
