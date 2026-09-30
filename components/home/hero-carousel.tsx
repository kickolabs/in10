"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { carouselImages } from "@/lib/data/photos";

export function HeroCarousel() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const items = [...carouselImages, ...carouselImages];

  return (
    <div
      className="relative mt-10 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex w-max gap-4 px-4 sm:px-6"
        animate={reduce || paused ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 46, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, index) => (
          <figure
            key={`${item.label}-${index}`}
            className="relative h-52 w-72 shrink-0 overflow-hidden rounded-[1.6rem] border border-white/40 shadow-lg md:h-64 md:w-80"
          >
            <Image src={item.src} alt={item.alt} fill sizes="320px" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent px-4 pb-4 pt-10 text-sm font-medium text-white">
              {item.label}
            </figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
}
