import { Request, Response } from "express";
import axios from "axios";
import { PrismaClient } from "../generated/prisma";
import { getCodeforcesApi } from "../const/const";

const prisma = new PrismaClient();

export const addUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  
  if (!userId) {
    res.status(400).json({
      message: "User ID is required."
    });
    return;
  }
  try {
    const api = getCodeforcesApi(userId, 'USER_INFO'); 
    const response = (await axios.get(api)).data;

    if(response.status === 'OK') {
      const userInfo = response.result[0];
      const user = await prisma.user.create({
        data: {
          id: userId,
          name: `${userInfo.firstName} ${userInfo.lastName}`,
          email: userInfo.email ?? null,
          rating: userInfo.rating ?? null,
          rank: userInfo.rank ?? null,
          maxRating: userInfo.maxRating ?? null,
          maxRank: userInfo.maxRank ?? null,
          createdAt: new Date(userInfo.registrationTimeSeconds * 1000),
        }
      });
      res.status(200).json({
        message: "User created",
        data: user
      });
      return;
    }

    res.status(404).json({
      message: "Invalid Codeforces user or user not found.",
    });
    return;
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message || 'Something went wrong',
    });
    return;
  }
};

export const deleteUser = async(req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).json({
      message: "User ID is required."
    });
    return;
  }
  try {
    await prisma.user.delete({
      where: { id: userId }
    });
    res.status(200).json({
      message: "User deleted",
    });
    return;
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message || 'Something went wrong',
    });
    return;
  }
}