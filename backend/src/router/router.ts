import express, { Request, Response } from "express";
import { getContestDetails } from "../service/getContestDetails";
import { ContestFilterDay, ProblemFilterDay } from "../types";
import { problemSolvingData } from "../service/problemSolvingData";

const router = express.Router();

const validContestFilterDays: ContestFilterDay[] = [30, 90, 365];
const validProblemFilterDays: ProblemFilterDay[] = [7, 30, 90];


router.get('/contest-info/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const filterDay = Number(req.query.filterDay) as ContestFilterDay | undefined;

    if(!userId || !filterDay || !validContestFilterDays.includes(filterDay)) {
      res.status(400).json({
        message: "Invalid userId or filterDay"
      });
      return;
    }
    
    const contestDetails = await getContestDetails(userId, filterDay);
    res.json(contestDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/problem-info/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const filterDay = Number(req.query.filterDay) as ProblemFilterDay | undefined;

    if(!userId || !filterDay || !validProblemFilterDays.includes(filterDay)) {
      res.status(400).json({
        message: "Invalid userId or filterDay"
      });
      return;
    }
    
    const problemDetails = await problemSolvingData(userId, filterDay);
    res.json(problemDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;