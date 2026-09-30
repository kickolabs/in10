import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { travelServices } from "@/lib/data/content";
import { photos } from "@/lib/data/photos";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Fly Maverick",
  "Flight ticket assistance, hotel booking, room booking, tour packages and travel support from Fly Maverick.",
  "/fly-maverick",
);

export default function FlyMaverickPage() {
  return (
    <>
      <PageHero
        eyebrow="Fly Maverick"
        title="Travel services for the journey around your plans."
        text="Fly Maverick arranges flights, stays and tours. It is a travel flagship, separate from internship selection, and it does not provide visa processing."
      />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-[2rem]">
          <Image src={photos.airport} alt="Aircraft wing during travel" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-navy">Practical travel support</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Use Fly Maverick when you need help booking the trip itself. Internship eligibility and travel bookings stay as separate conversations.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/contact">Explore Travel Services</Link>
          </Button>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {travelServices.map((item) => (
          <article key={item.name} className="rounded-3xl border border-line bg-white p-6">
            <h3 className="text-xl font-bold text-navy">{item.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}
