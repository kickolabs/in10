import { Suspense } from "react";
import { ApplicationForm } from "@/components/forms/application-form";
import { PageHero } from "@/components/shared/page-hero";
import { getOptionalUser } from "@/lib/supabase/server";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Apply",
  "Submit an internship application to INTERN IN10. Eligibility and outcomes depend on the program, destination and current availability.",
  "/apply",
);

export const dynamic = "force-dynamic";

export default async function ApplyPage() {
  const user = await getOptionalUser();
  const fullName = typeof user?.user_metadata?.full_name === "string" ? user.user_metadata.full_name : "";

  return (
    <>
      <PageHero
        eyebrow="Apply"
        title="Tell us where you want to train."
        text="Share your profile and resume. International opportunities are subject to current availability and applicable requirements."
      />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-line bg-white p-5 shadow-sm sm:p-8">
          <Suspense>
            <ApplicationForm signedIn={Boolean(user)} defaultEmail={user?.email ?? ""} defaultName={fullName} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
