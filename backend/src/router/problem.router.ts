import express from "express";
import { 
  getProblemsInfo, 
  updateProblemsInfo 
} from "../controller/problem.controller";

const router = express.Router();

router.get("/problem/:userId", getProblemsInfo);
router.put("/problem", updateProblemsInfo);

export default router;