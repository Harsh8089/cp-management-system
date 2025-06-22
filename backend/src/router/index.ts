import { Router } from "express";
import userRouter from "./user.router";
import contestRouter from "./contest.router";

const router = Router();

router.use(userRouter);
router.use(contestRouter);

export default router;
