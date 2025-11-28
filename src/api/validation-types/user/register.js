import z from "zod";

export const userRegisterDtoInSchema = z.object({
  email: z.email(),
  name: z.string().min(2).max(64),
  password: z.string().min(8).max(256),
});
