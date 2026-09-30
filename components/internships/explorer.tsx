import { InternshipCard } from "@/components/cards/cards";
import type { Internship } from "@/lib/data/internships";

export function InternshipExplorer({ listings }: { listings: Internship[] }) {
  return (
    <div>
      <p className="text-sm text-muted">
        {listings.length} {listings.length === 1 ? "opportunity" : "opportunities"} shown. Openings change with eligibility and current availability.
      </p>
      {listings.length ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((item) => (
            <InternshipCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="text-lg font-semibold text-navy">No openings are listed right now.</p>
        </div>
      )}
    </div>
  );
}
