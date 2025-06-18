import express, { Request, Response } from "express";
import { getContestDetails } from "../service/getContestDetails";
import { ContestFilterDay } from "../types";

const router = express.Router();

const validFilterDays: ContestFilterDay[] = [30, 90, 365];

router.get('/contest-info/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const filterDay = Number(req.query.filterDay) as ContestFilterDay | undefined;

    if(!userId || !filterDay || !validFilterDays.includes(filterDay)) {
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

export default router;