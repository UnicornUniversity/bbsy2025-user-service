import z from "zod";
import { passwordSchema } from "../common.js";

export const userLoginDtoInSchema = z.object({
  email: z.email(),
  password: passwordSchema
});