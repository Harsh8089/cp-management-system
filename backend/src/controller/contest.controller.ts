import { Request, Response } from "express";
import axios from "axios";
import { PrismaClient } from "../generated/prisma";
import { getCodeforcesApi } from "../const/const";
import { ContestApi } from "../types";

const prisma = new PrismaClient();

export const getContestInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "User Id is required." });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, contests: true },
    });

    if (!user) {
      res.status(404).json({ message: "User not found in DB" });
      return;
    }

    res.status(200).json({
      message: "Contests fetched successfully",
      data: user.contests,
    });
    return;
  } catch (error: any) {
    console.error("Error fetching contests:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message || "Something went wrong",
    });
    return;
  }
};

export const updateContestInfo = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "User Id is required." });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: "User not found in DB" });
      return;
    }

    const apiUrl = getCodeforcesApi(userId, "CONTEST_INFO");
    const response = await axios.get(apiUrl);

    if (response.data.status !== "OK") {
      res.status(502).json({ message: "Failed to fetch data from Codeforces." });
      return;
    }

    const contestInfo = response.data.result as ContestApi[];
    const contestsData = contestInfo.map((c) => ({
      contestId: String(c.contestId),
      name: c.contestName,
      rank: c.rank,
      oldRating: c.oldRating,
      newRating: c.newRating,
      date: new Date(c.ratingUpdateTimeSeconds * 1000),
      userId,
    }));

    await prisma.contestResult.deleteMany({
      where: { userId },
    });

    const createdContests = await prisma.contestResult.createMany({
      data: contestsData,
    });

    res.status(200).json({
      message: "Contests updated successfully",
      count: createdContests.count,
    });
    return;
  } catch (error: any) {
    console.error("Error updating contests:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message || "Something went wrong",
    });
    return;
  }
};
