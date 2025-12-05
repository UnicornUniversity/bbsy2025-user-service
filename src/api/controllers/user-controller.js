import { Router } from "express";
import { adaptAbl } from "../../components/controller-adapter.js";

import { authorizationHandler } from "../../components/authorization-handler.js";
import { Profiles } from "../profiles.js";

import { userRegisterHandler } from "../../abl/user/register.js";
import { userLoginHandler } from "../../abl/user/login.js";
import { userGetHandler } from "../../abl/user/get.js";

export const router = Router();

router.post("/register", adaptAbl(userRegisterHandler));
router.post("/login", adaptAbl(userLoginHandler));
router.get("/get", authorizationHandler([Profiles.admin, Profiles.user]), adaptAbl(userGetHandler))
