import express from "express";
import "dotenv/config";
import { connectDB } from "./config/DB";
import { contactRoute } from "./Routes/contactRouter";
import movieRouter from "./Routes/movieRouter";
import { userRouter } from "./Routes/userRouter";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());

connectDB();

app.use(`/contact`, contactRoute);

app.use(`/movies`, movieRouter);

app.use(`/user`, userRouter);





  

app.listen(5000, () => {
  console.log("we running in port 5000 now ");
});



