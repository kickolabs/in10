"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact } from "@/lib/actions/contact";
import { initialFormState } from "@/lib/actions/form-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="grid gap-4">
      <div>
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" name="fullName" required autoComplete="name" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required className="mt-1.5" />
      </div>
      {state.message ? (
        <p role={state.status === "error" ? "alert" : "status"} className={state.status === "error" ? "text-sm text-brand-magenta" : "text-sm text-navy"}>
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="bg-brand-gradient inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Sending…" : "Talk to Our Team"}
      </button>
    </form>
  );
}
