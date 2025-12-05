import z from "zod";

export const idSchema = z.string().regex(/^[0-9a-f]{24}$/);

export const nameSchema = z.string().min(2).max(64);

export const passwordSchema = z.string().min(8).max(256);
