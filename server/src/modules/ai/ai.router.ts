import { Router } from "express";
import { aiController } from "./ai.controller";

const router = Router();

router.post("/chat", aiController.chat);

export const aiRouter = router;
