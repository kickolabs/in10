"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { site } from "@/lib/site";
import { safeNextPath } from "@/lib/utils";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const configured = isSupabaseConfigured();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!configured) {
      setError(`Sign-in is not available yet. Email ${site.email} if you need help with your account.`);
      return;
    }
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const fullName = String(form.get("fullName") ?? "");
    if (password.length < 8) {
      setError("Use a password of at least 8 characters.");
      return;
    }
    setPending(true);
    const supabase = createClient();
    if (mode === "signup") {
      const { data, error: signError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      setPending(false);
      if (signError) {
        setError(signError.message);
        return;
      }
      if (data.session) {
        router.push(safeNextPath(params.get("next")));
        router.refresh();
        return;
      }
      setMessage("Account created. Confirm your email if required, then sign in.");
      return;
    }
    const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);
    if (signError) {
      setError(signError.message);
      return;
    }
    router.push(safeNextPath(params.get("next")));
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {mode === "signup" ? (
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" name="fullName" required autoComplete="name" className="mt-1.5" />
        </div>
      ) : null}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} className="mt-1.5" />
      </div>
      {error ? <p role="alert" className="text-sm text-brand-magenta">{error}</p> : null}
      {message ? <p role="status" className="text-sm text-navy">{message}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
      </Button>
      <p className="text-sm text-muted">
        {mode === "signup" ? (
          <>
            Already have an account? <Link href="/login" className="font-semibold text-navy">Sign in</Link>
          </>
        ) : (
          <>
            New here? <Link href="/signup" className="font-semibold text-navy">Create an account</Link>
          </>
        )}
      </p>
    </form>
  );
}
