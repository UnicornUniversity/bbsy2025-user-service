import z from "zod";
import { nameSchema, passwordSchema } from "../common.js";

export const userRegisterDtoInSchema = z.object({
  email: z.email(),
  name: nameSchema,
  password: passwordSchema,
});
