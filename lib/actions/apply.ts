"use server";

import { revalidatePath } from "next/cache";
import type { FormState } from "@/lib/actions/form-state";
import { createAdminClient } from "@/lib/supabase/admin";
import { getOptionalUser } from "@/lib/supabase/server";
import { site } from "@/lib/site";
import {
  validateEducation,
  validateEmail,
  validateMobile,
  validateName,
  validateResume,
  type ApplicationField,
} from "@/lib/validation/application";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = text(formData, "name");
  const mobile = text(formData, "mobile");
  const email = text(formData, "email");
  const education = text(formData, "education");
  const resume = formData.get("resume");
  const file = resume instanceof File ? resume : null;

  const fieldErrors: Partial<Record<ApplicationField, string>> = {};
  const nameError = validateName(name);
  const mobileError = validateMobile(mobile);
  const emailError = validateEmail(email);
  const educationError = validateEducation(education);
  const resumeError = validateResume(file);
  if (nameError) fieldErrors.name = nameError;
  if (mobileError) fieldErrors.mobile = mobileError;
  if (emailError) fieldErrors.email = emailError;
  if (educationError) fieldErrors.education = educationError;
  if (resumeError) fieldErrors.resume = resumeError;

  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "", fieldErrors };
  }

  const admin = createAdminClient();
  if (!admin) {
    return {
      status: "error",
      message: `Please email ${site.email} and we will take your details directly.`,
    };
  }

  const user = await getOptionalUser();
  const safeName = file!.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  const folder = user?.id ?? "guest";
  const resumePath = `${folder}/${crypto.randomUUID()}-${safeName}`;
  const bytes = Buffer.from(await file!.arrayBuffer());

  const upload = await admin.storage.from("resumes").upload(resumePath, bytes, {
    contentType: file!.type || "application/octet-stream",
    upsert: false,
  });
  if (upload.error) {
    return { status: "error", message: "The resume could not be uploaded. Please try again." };
  }

  const { error } = await admin.from("applications").insert({
    user_id: user?.id ?? null,
    full_name: name,
    mobile,
    email,
    education,
    resume_path: resumePath,
  });

  if (error) {
    return { status: "error", message: "The application could not be saved. Please try again." };
  }

  revalidatePath("/account");
  return {
    status: "success",
    message: user
      ? "Application received. You can review it in your account."
      : "Application received. Our team will review your profile against current program requirements.",
  };
}
