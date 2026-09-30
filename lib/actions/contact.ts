"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { site } from "@/lib/site";
import type { FormState } from "@/lib/actions/form-state";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (fullName.length < 2) return { status: "error", message: "Enter your name." };
  if (!emailPattern.test(email)) return { status: "error", message: "Enter a valid email address." };
  if (message.length < 10) return { status: "error", message: "Write a short message so the team can help." };

  const admin = createAdminClient();
  if (!admin) {
    return {
      status: "error",
      message: `Please email ${site.email} instead.`,
    };
  }

  const { error } = await admin.from("contact_messages").insert({
    full_name: fullName,
    email,
    phone: phone || null,
    message,
  });

  if (error) return { status: "error", message: "The message could not be sent. Please try again." };
  return { status: "success", message: "Message received. A member of the team will reply by email." };
}
