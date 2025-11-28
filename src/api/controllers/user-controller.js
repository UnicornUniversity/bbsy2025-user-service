import { Router } from "express";
import { adaptAbl } from "../../components/controller-adapter.js";

import { userRegisterHandler } from "../../abl/user/register.js";
import { userLoginHandler } from "../../abl/user/login.js";

export const router = Router();

router.post("/register", adaptAbl(userRegisterHandler));
router.post("/login", adaptAbl(userLoginHandler));
