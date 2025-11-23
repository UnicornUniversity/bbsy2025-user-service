import z from "zod";
import { InvalidDtoInError } from "../api/errors/common.js";

export class Validator {
  /**
   * @template {T}
   * @param {z.ZodSchema<T>} dtoInSchema
   * @param {unknown} dtoIn
   * @returns {T}
   */
  static validateDtoIn(dtoInSchema, dtoIn) {
    const result = dtoInSchema.safeParse(dtoIn);
    if (result.error) {
      throw new InvalidDtoInError(result.error.issues);
    }

    return result.data;
  }
}
