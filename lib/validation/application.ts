export type ApplicationField = "name" | "mobile" | "email" | "education" | "resume";

export const applicationMessages = {
  name: "Name should contain letters only.",
  mobile: "Enter a valid 10-digit mobile number.",
  email: "Please enter a valid email address.",
  education: "Please enter your education details.",
  resumeRequired: "Upload your resume as a PDF or Word file.",
  resumeType: "Resume must be a PDF or Word document.",
  resumeSize: "Resume must be 5 MB or smaller.",
} as const;

const namePattern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
const mobilePattern = /^\d{10}$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const resumeLimit = 5 * 1024 * 1024;

const resumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function validateName(value: string) {
  return namePattern.test(value.trim()) ? "" : applicationMessages.name;
}

export function validateMobile(value: string) {
  return mobilePattern.test(value) ? "" : applicationMessages.mobile;
}

export function validateEmail(value: string) {
  return emailPattern.test(value.trim()) ? "" : applicationMessages.email;
}

export function validateEducation(value: string) {
  return value.trim() ? "" : applicationMessages.education;
}

export function validateResume(file: File | null) {
  if (!file || file.size === 0) return applicationMessages.resumeRequired;
  const filename = file.name.toLowerCase();
  const extensionOk = filename.endsWith(".pdf") || filename.endsWith(".doc") || filename.endsWith(".docx");
  const typeOk = file.type === "" || resumeTypes.has(file.type);
  if (!extensionOk || !typeOk) return applicationMessages.resumeType;
  if (file.size > resumeLimit) return applicationMessages.resumeSize;
  return "";
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}
