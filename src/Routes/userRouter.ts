import express from "express";
import {
  getUserByEmail,
  getUserById,
  getUsers,
  Regester,
  Login
} from "../controler/userControler";
import validate from "../middleware/validate";
import { userSchema } from "../schemas/userSchema";

export const userRouter = express();

userRouter.get(`/`, getUsers);

userRouter.post(`/`, validate(userSchema), Regester);
userRouter.get(`/login`, Login);


userRouter.get(`/search/:id`, getUserById);
userRouter.get(`/search/email/:email`, getUserByEmail);
