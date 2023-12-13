import { z } from "zod";

export const LoginForm = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});
export type LoginFormData = z.infer<typeof LoginForm>;
