import { PageHero, Prose } from "@/components/shared/page-hero";
import { site } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Privacy Policy",
  "How INTERN IN10 handles personal information submitted through in10.in.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" text="How information submitted on this website is used." />
      <Prose>
        <p>
          INTERN IN10 collects the details you choose to send through the application and contact forms, including your name, contact information, education, preferences and resume.
        </p>
        <p>
          That information is used to review internship interest, reply to messages, and — if you create an account — show applications you submitted while signed in. Guest applications are stored without a user account.
        </p>
        <p>
          Resumes are stored in a private file store. We do not sell personal information. Access is limited to the team operating {site.domain} and the systems that host the site.
        </p>
        <p>
          You may ask for a correction or deletion of your application details by emailing {site.email}. If you create an account, your password is stored securely by the sign-in service and is not kept as readable text on this website.
        </p>
      </Prose>
    </>
  );
}
