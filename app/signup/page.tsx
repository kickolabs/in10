import { Suspense } from "react";
import { AuthForm } from "@/components/forms/auth-form";
import { PageHero } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Create account",
  "Create an INTERN IN10 account so applications submitted while you are signed in stay available to review.",
  "/signup",
);

export default function SignupPage() {
  return (
    <>
      <PageHero eyebrow="Account" title="Create an account" text="An account is optional. Guest applications are stored, but they will not appear in an account later." />
      <section className="mx-auto max-w-md px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-line bg-white p-6">
          <Suspense>
            <AuthForm mode="signup" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
