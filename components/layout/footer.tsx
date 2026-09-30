import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { flagshipLinks, site } from "@/lib/site";

const socialIcons = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
} as const;

export function Footer() {
  const socials = site.socials.filter((item) => item.href);
  return (
    <footer className="mt-8 border-t border-line bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
            An international internship platform connecting candidates with opportunities across destinations and industries.
          </p>
          <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-white/90">{site.tagline}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/internships", "Internships"],
              ["/destinations", "Destinations"],
              ["/industries", "Industries"],
              ["/how-it-works", "How It Works"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Flagships</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {flagshipLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            {site.phoneDisplay ? (
              <li>
                <a href={site.phoneHref || undefined} className="hover:text-white">
                  {site.phoneDisplay}
                </a>
              </li>
            ) : (
              <li>Phone to be confirmed</li>
            )}
            {site.address.length ? site.address.map((line) => <li key={line}>{line}</li>) : <li>Office location to be confirmed</li>}
          </ul>
          {socials.length ? (
            <div className="mt-5 flex gap-3">
              {socials.map((item) => {
                const Icon = socialIcons[item.label as keyof typeof socialIcons];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 hover:bg-white/10"
                  >
                    {Icon ? <Icon className="size-4" /> : item.label}
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Intern IN10. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
