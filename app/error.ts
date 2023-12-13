import { ZodError } from "zod";

export interface Error {
  error: string | string[];
}

export const constructError = (code: number): Error => {
  switch (code) {
    case 1:
      return { error: "Invalid email or password" };
    default:
      return { error: "Unknown error" };
  }
};

export const zodErrorToError = (error: ZodError): Error => {
  const errorMessages = error.issues.map(
    (issue) => `[${issue.path.join("/")}] ${issue.message}`
  );
  return { error: errorMessages };
};
