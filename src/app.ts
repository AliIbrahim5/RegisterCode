import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db";

import { userRouter } from "./Routes/userRouter";

const app = express();

app.use(express.json());

connectDB();

app.use(`/user`, userRouter);

app.listen(5000, () => {
  console.log("we running in port 5000 now ");
});
