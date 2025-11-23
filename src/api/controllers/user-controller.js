import { Router } from "express";
import { userLoginHandler } from "../../abl/user/login.js";

export const router = Router();

router.post("/login", userLoginHandler);
