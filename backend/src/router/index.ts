import { Router } from "express";
import userRouter from "./user.router";
import contestRouter from "./contest.router";
import problemRouter from "./problem.router";

const router = Router();

router.use(userRouter);
router.use(contestRouter);
router.use(problemRouter);

export default router;
