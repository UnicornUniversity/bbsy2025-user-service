import z from "zod";
import { idSchema } from "../common.js";

export const userGetDtoInSchema = z.object({
  id: idSchema.optional(),
});
