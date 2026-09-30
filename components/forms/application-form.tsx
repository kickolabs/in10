"use client";

import { useActionState, useEffect, useRef, useState, type ComponentProps, type FormEvent } from "react";
import { submitApplication } from "@/lib/actions/apply";
import { initialFormState } from "@/lib/actions/form-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  digitsOnly,
  validateEducation,
  validateEmail,
  validateMobile,
  validateName,
  validateResume,
  type ApplicationField,
} from "@/lib/validation/application";

export function ApplicationForm({
  defaultName = "",
  defaultEmail = "",
  signedIn = false,
}: {
  defaultName?: string;
  defaultEmail?: string;
  signedIn?: boolean;
}) {
  const [state, action, pending] = useActionState(submitApplication, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState<Partial<Record<ApplicationField, string>>>({});

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setMobile("");
      setErrors({});
    }
  }, [state]);

  useEffect(() => {
    if (state.fieldErrors) setErrors(state.fieldErrors);
  }, [state]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const resume = data.get("resume");
    const next: Partial<Record<ApplicationField, string>> = {};
    const nameError = validateName(String(data.get("name") ?? ""));
    const mobileError = validateMobile(String(data.get("mobile") ?? ""));
    const emailError = validateEmail(String(data.get("email") ?? ""));
    const educationError = validateEducation(String(data.get("education") ?? ""));
    const resumeError = validateResume(resume instanceof File ? resume : null);
    if (nameError) next.name = nameError;
    if (mobileError) next.mobile = mobileError;
    if (emailError) next.email = emailError;
    if (educationError) next.education = educationError;
    if (resumeError) next.resume = resumeError;
    setErrors(next);
    if (Object.keys(next).length) event.preventDefault();
  }

  return (
    <form ref={formRef} action={action} noValidate onSubmit={onSubmit} className="grid gap-4">
      <p className="rounded-2xl bg-background px-4 py-3 text-sm leading-6 text-muted">
        {signedIn
          ? "You are signed in. This application will appear in your account."
          : "You can apply without an account. Sign in first if you want to review the application later."}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          defaultValue={defaultName}
          autoComplete="name"
          error={errors.name}
          onChange={() => setErrors((current) => ({ ...current, name: undefined }))}
        />
        <Field
          label="Mobile Number"
          name="mobile"
          type="text"
          inputMode="numeric"
          autoComplete="tel"
          value={mobile}
          pattern="[0-9]{10}"
          error={errors.mobile}
          onChange={(event) => {
            setMobile(digitsOnly(event.target.value));
            setErrors((current) => ({ ...current, mobile: undefined }));
          }}
        />
        <Field
          label="Email Address"
          name="email"
          type="text"
          inputMode="email"
          defaultValue={defaultEmail}
          autoComplete="email"
          error={errors.email}
          onChange={() => setErrors((current) => ({ ...current, email: undefined }))}
        />
        <Field
          label="Education"
          name="education"
          autoComplete="organization"
          error={errors.education}
          onChange={() => setErrors((current) => ({ ...current, education: undefined }))}
        />
        <div className="sm:col-span-2">
          <Label htmlFor="resume">Resume</Label>
          <Input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="mt-1.5 pt-2"
            onChange={() => setErrors((current) => ({ ...current, resume: undefined }))}
          />
          <p className="mt-1 text-xs text-muted">PDF or Word, up to 5 MB.</p>
          {errors.resume ? (
            <p role="alert" className="mt-1 text-sm text-brand-magenta">
              {errors.resume}
            </p>
          ) : null}
        </div>
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
        {pending ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  className,
  ...props
}: ComponentProps<"input"> & { label: string; name: string; error?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} className="mt-1.5" aria-invalid={error ? true : undefined} {...props} />
      {error ? (
        <p role="alert" className="mt-1 text-sm text-brand-magenta">
          {error}
        </p>
      ) : null}
    </div>
  );
}
