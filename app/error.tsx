"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-navy">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted">Please try again. If it continues, email the team from the contact page.</p>
      <button onClick={reset} className="bg-brand-gradient mt-6 h-11 rounded-full px-5 text-sm font-semibold text-white">
        Try again
      </button>
    </div>
  );
}
