import { Request, Response } from "express";
import axios from "axios";
import { PrismaClient } from "../generated/prisma";
import { getCodeforcesApi } from "../const/const";
import { ProblemApi } from "../types";
import { isBefore, isSameDay } from "date-fns";

const prisma = new PrismaClient();

export const getProblemsInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "User Id is required." });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, problems: true },
    });

    if (!user) {
      res.status(404).json({ message: "User not found in DB" });
      return;
    }

    res.status(200).json({
      message: "Problems fetched successfully",
      data: user.problems,
    });
    return;
  } catch (error: any) {
    console.error("Error fetching problems:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message || "Something went wrong",
    });
    return;
  }
};

export const updateProblemsInfo = async (req: Request, res: Response) => {
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

    const apiUrl = getCodeforcesApi(userId, "PROBLEM_INFO");
    const response = await axios.get(apiUrl);

    if (response.data.status !== "OK") {
      res.status(502).json({ message: "Failed to fetch data from Codeforces." });
      return;
    }

    const problemInfo = response.data.result as ProblemApi[];

    const problemsInDb = await prisma.problem.findMany({
      where: { userId },
      select: { submittedAt: true }
    });
    
    let lastProblemSubmissionDate: Date | undefined = undefined;

    for(const p of problemsInDb) {
      const max = p.submittedAt.sort((a, b) => b.getTime() - a.getTime())[0];
      if(
        !lastProblemSubmissionDate || 
        max > lastProblemSubmissionDate 
      ) 
        lastProblemSubmissionDate = max;
    }

    const insertQueries = [], updateQueries = [];
    const problemSet = new Set<string>();

    for (const p of problemInfo) {
      if(p.verdict !== 'OK') continue;

      const currentProblemSubmissionDate = new Date(p.creationTimeSeconds * 1000);

      if(
        lastProblemSubmissionDate && (
          isBefore(currentProblemSubmissionDate, lastProblemSubmissionDate) || 
          isSameDay(currentProblemSubmissionDate, lastProblemSubmissionDate)
      )) 
        continue;

      const id = p.id;
      const data = {
        name: p.problem.name,
        rating: p.problem.rating ?? null,
        tags: p.problem.tags ?? [],
        submittedAt: [currentProblemSubmissionDate],
        contestId: p.contestId ?? null,
        userId
      };

      if(problemSet.has(p.problem.name)) {
        updateQueries.push(
          prisma.problem.update({
            where: { id, userId },
            data: {
              submittedAt: {
                push: currentProblemSubmissionDate
              }
            }
          })
        )
      } else {
        insertQueries.push(
          prisma.problem.upsert({
            where: { id },
            update: data,
            create: { id, ...data }
          })
        )
      }

      problemSet.add(p.problem.name);
    }

    await Promise.all([...insertQueries, ...updateQueries]);

    const problems = await prisma.problem.findMany({ where: { userId } })

    res.status(200).json({
      message: "Problems updated successfully",
      count: problems
    });
    return;
  } catch (error: any) {
    console.error("Error updating problems:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message || "Something went wrong",
    });
    return;
  }
};
