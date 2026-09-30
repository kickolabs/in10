import { PageHero, Prose } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Cookie Policy",
  "Cookies used on the INTERN IN10 website, including authentication cookies.",
  "/cookies",
);

export default function CookiesPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie Policy" text="What this site stores in the browser." />
      <Prose>
        <p>
          The public pages do not require advertising cookies. If you sign in, the authentication service stores session cookies so you can stay signed in and view your applications.
        </p>
        <p>Those cookies are used to keep the session secure and to know which account is browsing. You can sign out, or clear cookies in your browser, to end the session.</p>
        <p>Embedded maps, when an office location is published, may set cookies from the map provider. Until a location is confirmed, the contact page does not load a map.</p>
      </Prose>
    </>
  );
}
