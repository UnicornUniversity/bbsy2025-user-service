import { Router } from "express";
import { appInitHandler } from "../../abl/app/init.js";
import { adaptAbl } from "../../components/controller-adapter.js";

export const router = Router();

router.post("/init", adaptAbl(appInitHandler));