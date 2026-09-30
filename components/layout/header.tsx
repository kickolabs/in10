"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { flagshipLinks, navLinks, secondaryLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [flagshipsOpen, setFlagshipsOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setFlagshipsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user)));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user));
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  const linkClass = (href: string) =>
    cn(
      "rounded-full px-2.5 py-2 text-[13px] font-medium text-navy/80 transition hover:bg-white hover:text-navy",
      isActive(pathname, href) && "bg-white text-navy shadow-sm",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-line bg-white/75 shadow-[0_10px_40px_-24px_rgba(12,27,77,0.45)] backdrop-blur-xl"
          : "border-transparent bg-white/55 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" aria-label="INTERN IN10 home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <div className="group relative">
            <button
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-[13px] font-medium text-navy/80 hover:bg-white"
              aria-haspopup="true"
            >
              Flagships
              <ChevronDown className="size-3.5 transition group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full z-20 w-64 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-line bg-white/90 p-2 shadow-xl backdrop-blur-xl">
                {flagshipLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-3 py-2.5 hover:bg-background"
                  >
                    <span className="block text-sm font-semibold text-navy">{link.label}</span>
                    <span className="block text-xs text-muted">{link.detail}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {secondaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {signedIn ? (
            <Button variant="ghost" asChild>
              <Link href="/account">Account</Link>
            </Button>
          ) : null}
          <Button asChild>
            <Link href="/apply">
              Apply Now
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </div>

        <button
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  className="fixed inset-0 top-[4.5rem] z-40 bg-white lg:hidden"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.2 }}
                >
                  <nav className="flex h-full flex-col gap-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-2xl px-3 py-3 text-lg font-semibold text-navy">
                  {link.label}
                </Link>
              ))}
              <button
                className="flex items-center justify-between rounded-2xl px-3 py-3 text-left text-lg font-semibold text-navy"
                aria-expanded={flagshipsOpen}
                onClick={() => setFlagshipsOpen((value) => !value)}
              >
                Flagships
                <ChevronDown className={cn("size-5 transition", flagshipsOpen && "rotate-180")} />
              </button>
              {flagshipsOpen
                ? flagshipLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="rounded-2xl px-6 py-2 text-base text-muted">
                      {link.label}
                    </Link>
                  ))
                : null}
              {secondaryLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-2xl px-3 py-3 text-lg font-semibold text-navy">
                  {link.label}
                </Link>
              ))}
              {signedIn ? (
                <Link href="/account" className="rounded-2xl px-3 py-3 text-lg font-semibold text-navy">
                  Account
                </Link>
              ) : (
                <Link href="/login" className="rounded-2xl px-3 py-3 text-lg font-semibold text-navy">
                  Sign in
                </Link>
              )}
              <Button className="mt-4" size="lg" asChild>
                <Link href="/apply">Apply Now</Link>
              </Button>
            </nav>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
