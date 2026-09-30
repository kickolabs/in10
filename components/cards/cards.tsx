import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/data/content";
import type { Internship } from "@/lib/data/internships";

export function InternshipCard({ item }: { item: Internship }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(36,87,230,0.55)]">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
        <p className="absolute bottom-3 left-4 text-sm font-medium text-white">{item.destination}</p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-purple">{item.industry}</p>
          <span className="rounded-full bg-background px-2.5 py-1 text-[11px] font-semibold text-navy">{item.availability}</span>
        </div>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-navy">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-muted">Type</dt>
            <dd className="font-medium text-navy">{item.type}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Duration</dt>
            <dd className="font-medium text-navy">{item.duration}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-muted">Eligibility</dt>
            <dd className="font-medium text-navy">{item.eligibility}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-muted">Language</dt>
            <dd className="font-medium text-navy">{item.language}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-muted">Accommodation</dt>
            <dd className="font-medium text-navy">{item.accommodation}</dd>
          </div>
        </dl>
        <Link
          href={`/apply?industry=${encodeURIComponent(item.industry)}&destination=${encodeURIComponent(item.destination)}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
        >
          Apply for this direction
          <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

export function DestinationCard({ item }: { item: Destination }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52">
        <Image
          src={item.image}
          alt={`${item.name} destination`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold text-navy">{item.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
        <p className="mt-3 text-sm text-navy">
          <span className="font-semibold">Sectors: </span>
          {item.sectors.join(", ")}
        </p>
        <p className="mt-2 text-sm text-muted">{item.languageNote}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-brand-magenta">Available opportunities may vary.</p>
        <Link
          href={`/internships?destination=${item.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
        >
          Explore opportunities
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export function IndustryCard({
  name,
  summary,
  examples,
  image,
  filter,
}: {
  name: string;
  summary: string;
  examples: readonly string[];
  image: string;
  filter: string;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52">
        <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-navy">{name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {examples.map((example) => (
            <li key={example} className="rounded-full bg-background px-3 py-1 text-xs font-medium text-navy">
              {example}
            </li>
          ))}
        </ul>
        <Link
          href={`/internships?industry=${encodeURIComponent(filter)}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
        >
          Explore opportunities
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
