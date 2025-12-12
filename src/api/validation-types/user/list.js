import z from "zod";
import { pageInfo } from "../common.js";

export const userListDtoInSchema = z.object({
  pageInfo: pageInfo(10000, 1000),
});
