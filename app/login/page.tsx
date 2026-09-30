import { Suspense } from "react";
import { AuthForm } from "@/components/forms/auth-form";
import { PageHero } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Sign in",
  "Sign in to review internship applications you submitted while logged in to INTERN IN10.",
  "/login",
);

export default function LoginPage() {
  return (
    <>
      <PageHero eyebrow="Account" title="Sign in" text="Login is optional. It lets you review applications submitted while you were signed in." />
      <section className="mx-auto max-w-md px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-line bg-white p-6">
          <Suspense>
            <AuthForm mode="login" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
