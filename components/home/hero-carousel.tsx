"use client";

import Image from "next/image";
import { carouselImages } from "@/lib/data/photos";

function Track({ copy }: { copy: "a" | "b" }) {
  return (
    <div className="flex shrink-0 gap-4 pr-4" aria-hidden={copy === "b"}>
      {carouselImages.map((item) => (
        <figure
          key={`${copy}-${item.label}`}
          className="relative h-52 w-72 shrink-0 overflow-hidden rounded-[1.6rem] border border-white/40 shadow-lg md:h-64 md:w-80"
        >
          <Image src={item.src} alt={item.alt} fill sizes="320px" className="object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent px-4 pb-4 pt-10 text-sm font-medium text-white">
            {item.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function HeroCarousel() {
  return (
    <div className="relative mt-10 w-full overflow-hidden">
      <div className="hero-marquee flex w-max">
        <Track copy="a" />
        <Track copy="b" />
      </div>
    </div>
  );
}
