"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AnimatedSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 1, y: reduce ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: reduce ? 0 : 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-purple">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{text}</p> : null}
    </div>
  );
}
