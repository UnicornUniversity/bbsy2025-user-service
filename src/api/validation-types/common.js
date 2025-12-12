import z from "zod";

export const idSchema = z.string().regex(/^[0-9a-f]{24}$/);

export const nameSchema = z.string().min(2).max(64);

export const passwordSchema = z.string().min(8).max(256);

export const pageInfo = (maxPageSize = 10000, defaultPageSize = 1000) =>
  z
    .object({
      pageIndex: z.int().nonnegative().default(0),
      pageSize: z.int().positive().max(maxPageSize).default(defaultPageSize),
    })
    .default({ pageIndex: 0, pageSize: defaultPageSize });
