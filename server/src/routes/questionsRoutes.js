import { Router } from "express";
import { getQuestions, askQuestion } from "../controllers/questionsController.js";

const router = Router();

router.get("/questions", getQuestions);
router.post("/answer", askQuestion);

export default router;