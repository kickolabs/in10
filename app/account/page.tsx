import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/actions/auth";
import { PageHero } from "@/components/shared/page-hero";
import { getMyApplications } from "@/lib/data/queries";
import { getOptionalUser } from "@/lib/supabase/server";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Your applications",
  "Review internship applications you submitted while signed in to INTERN IN10.",
  "/account",
);

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getOptionalUser();
  if (!user) redirect("/login?next=/account");
  const applications = await getMyApplications();

  return (
    <>
      <PageHero eyebrow="Account" title="Applications submitted while signed in." text={user.email ?? "Your account"} />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <form action={signOut}>
          <button className="text-sm font-semibold text-navy underline" type="submit">
            Sign out
          </button>
        </form>
        {applications.length ? (
          <ul className="mt-6 space-y-3">
            {applications.map((item) => (
              <li key={item.id} className="rounded-3xl border border-line bg-white p-5">
                <p className="text-lg font-bold text-navy">{item.fullName}</p>
                <p className="mt-1 text-sm text-muted">{item.education}</p>
                <p className="mt-2 text-xs text-muted">
                  Submitted {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  {item.resumeAttached ? " · Resume attached" : ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-line bg-white px-6 py-12 text-center">
            <p className="font-semibold text-navy">No applications yet.</p>
            <p className="mt-2 text-sm text-muted">Applications sent before you signed in are not listed here.</p>
            <Link href="/apply" className="mt-4 inline-flex text-sm font-semibold text-brand-blue">
              Apply now
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
