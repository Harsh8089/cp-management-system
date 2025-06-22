import express from "express";
import { 
  getContestInfo, 
  updateContestInfo 
} from "../controller/contest.controller";

const router = express.Router();

router.get("/contest/:userId", getContestInfo);
router.put("/contest", updateContestInfo);

export default router;