import z from "zod";

export const userLoginDtoInSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(256)
});