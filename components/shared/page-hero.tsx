import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div className="glow-orb -left-16 top-0 size-56 bg-brand-purple/15" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-purple">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{text}</p>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-base leading-7 text-muted sm:px-6">{children}</div>;
}
