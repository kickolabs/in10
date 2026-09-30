/**
 * Official contact details were not in the project.
 * Replace the empty phone, address, and social URLs here when they are confirmed.
 */
export const site = {
  brand: "INTERN IN10",
  shortName: "IN10",
  domain: "in10.in",
  url: "https://in10.in",
  tagline: "INTERN TODAY. INSPIRE TOMORROW.",
  email: "hello@in10.in",
  phoneDisplay: "",
  phoneHref: "",
  address: [] as string[],
  mapQuery: "",
  socials: [
    { label: "Instagram", href: "" },
    { label: "Facebook", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "YouTube", href: "" },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/internships", label: "Internships" },
] as const;

export const flagshipLinks = [
  { href: "/lord-of-languages", label: "Lord of Languages", detail: "Language & Test Preparation" },
  { href: "/fly-maverick", label: "Fly Maverick", detail: "Travel services" },
] as const;

export const secondaryLinks = [{ href: "/contact", label: "Contact" }] as const;

export const footerQuickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/internships", label: "Internships" },
  { href: "/destinations", label: "Destinations" },
  { href: "/industries", label: "Industries" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/apply", label: "Apply" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerSocials = [
  { label: "Instagram", href: site.socials[0].href },
  { label: "Facebook", href: site.socials[1].href },
  { label: "LinkedIn", href: site.socials[2].href },
] as const;
