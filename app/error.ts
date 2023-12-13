import { ZodError } from "zod";

export interface Error {
  error: string | string[];
}

export const constructError = (code: number): Error => {
  switch (code) {
    case 1:
      return { error: "Invalid email or password" };
    case 2:
      return { error: "Missing Email" };
    case 3:
      return { error: "Missing Password" };
    case 4:
      return { error: "Missing First Name" };
    case 5:
      return { error: "Missing Last Name" };
    case 6:
      return { error: "Missing Password Confirm" };
    case 7:
      return { error: "User with this email already exists" };
    case 8:
      return { error: "Passwords do not match" };
    case 9:
      return { error: "Invalid Email" };

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
