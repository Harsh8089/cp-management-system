import express from "express";
import { 
  addUser, 
  deleteUser 
} from "../controller/user.controller";

const router = express.Router();

router.post("/user", addUser);
router.delete("/user", deleteUser);

export default router;