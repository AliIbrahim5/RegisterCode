import { prisma } from "../config/db";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { UserSchemaType } from "../schemas/userSchema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Users } from "@prisma/client";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const getAllUsers = await prisma.users.findMany();
    return res.status(200).json(getAllUsers);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "server Error !",
    });
  }
};
const generateCode = (): string => {
  const num = Math.floor(Math.random() * 10000);
  const code = num.toString().padStart(4, "0");
  return code;
};
export const Regester = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as UserSchemaType;
    const code = generateCode();

    const newUserWithCode = {
      ...newUser,
      code,
    };

    await prisma.users.create({ data: newUserWithCode });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "test.506112@gmail.com",
        pass: "szvcbsdjtiqwedwq",
      },
    });

    const mailOptions = {
      from: "test.506112@gmail.com",
      to: newUser.email,
      subject: "Welcome to My Website",
      text: `Thank you for registering on our website! Your verification code is ${code}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(transporter);

    return res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == "P2002") {
      return res.status(400).json({
        message: "Your email has been used before",
      });
    } else {
      return res.status(500).json({
        message: "Server error",
      });
    }
  }
};
export const VerifyCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body as { email: string; code: string };
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (user.code !== code) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }
    await prisma.users.update({
      where: { id: user.id },
      data: { isVerified: true, code: null },
    });
    return res.status(200).json({
      message: "User verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const passwordin = await prisma.users.findFirst({
      where: { password },
    });

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user?.email) {
      return res
        .status(401)
        .json({ message: "Ooh! The account does not exist" });
    }
    if (!passwordin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // check if user is verified
    if (!user.isVerified === true) {
      return res.status(401).json({ message: "Account is not verified" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body as {
      email: string;
      newPassword: string;
    };
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update user's password
    await prisma.users.update({
      where: { id: user.id },
      data: { password: newPassword },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "test.506112@gmail.com",
        pass: "szvcbsdjtiqwedwq",
      },
    });

    const mailOptions = {
      from: "test.506112@gmail.com",
      to: user.email,
      subject: "Password Reset",
      text: `تمت إعادة ضبط كلمة المرور الخاصة بك بنجاح. كلمة السر الجديدة الخاصة بك   ${newPassword}. يرجى تسجيل الدخول إلى حسابك باستخدام كلمة المرور هذه وتغييرها على الفور.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Password reset successful. Check your email for new password",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const forgotEmail = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body as Users;

    const user = await prisma.users.findUniqueOrThrow({
      where: { phoneNumber },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const email = user.email;

    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "test.506112@gmail.com",
        pass: "szvcbsdjtiqwedwq",
      },
    });

    const mailOptions = {
      from: "test.506112@gmail.com",
      to: email,
      subject: "Forgot Email",
      text: `Your email is: ${email}`,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          message: "Email sent to the user's email",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
