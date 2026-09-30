import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-navy">Page not found</h1>
      <p className="mt-3 text-sm text-muted">That link does not match a page on INTERN IN10.</p>
      <Link href="/" className="mt-6 inline-flex h-11 items-center rounded-full bg-navy px-5 text-sm font-semibold text-white">
        Back home
      </Link>
    </div>
  );
}
