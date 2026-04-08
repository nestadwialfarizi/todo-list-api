import * as z from "zod";

export const registerBody = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().nonempty().min(8),
});

export type RegisterBody = z.infer<typeof registerBody>;

export const loginBody = registerBody.omit({ name: true });

export type LoginBody = z.infer<typeof loginBody>;
