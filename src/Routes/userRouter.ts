import express from "express";
import {
  getUsers,
  Regester,
  Login,
  VerifyCode,
} from "../controler/userControler";
import validate from "../middleware/validate";
import { LoginType, RegesterType, VerifyCodeType } from "../schemas/userSchema";

export const userRouter = express();

userRouter.get(`/`, getUsers);
userRouter.post(`/`, validate(RegesterType), Regester);
userRouter.get(`/login`, validate(LoginType),Login);
userRouter.put(`/Verify`, validate(VerifyCodeType),VerifyCode);
