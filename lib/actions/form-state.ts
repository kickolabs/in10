export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "mobile" | "email" | "education" | "resume", string>>;
};

export const initialFormState: FormState = { status: "idle", message: "" };
