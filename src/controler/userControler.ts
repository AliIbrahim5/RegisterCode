import { prisma } from "../config/DB";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from 'bcrypt'
import { Request, Response } from "express";
import { UserSchemaType } from "../schemas/userSchema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

// get all users
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

// post user

// export const Regester = async (req: Request, res: Response) => {
//   try {
//     const newUser = req.body as UserSchemaType[`body`];
//     await prisma.users.create({ data: newUser });

//     // إنشاء نقل جديد لإرسال رسالة البريد الإلكتروني
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'test.506112@gmail.com',
//         pass: 'hbzljdagfnwokzoh'
//       }
//     });

//     const mailOptions = {
//       from: 'test.506112@gmail.com',
//       to: newUser.email,
//       subject: 'Welcome to My Website',
//       text: 'Thank you for registering on our website!'
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(201).json({
//       message: "user Added successfully",
//     });
//   } catch (error) {
//     const prismaError = error as PrismaClientKnownRequestError;
//     if (prismaError.code == "P2002") {
//       return res.status(400).json({
//         message: "Your email have been used before",
//       });
//     } else {
//       return res.status(500).json({
//         message: "Server Error !",
//       });
//     }
//   }
// };


export const Regester = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as UserSchemaType["body"];
    const code = crypto.randomBytes(3).toString("hex"); 


    const newUserWithCode = {
      ...newUser,
      code,
    };

    await prisma.users.create({ data: newUserWithCode });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "test.506112@gmail.com",
        pass: "hbzljdagfnwokzoh",
      },
    });

    const mailOptions = {
      from: "test.506112@gmail.com",
      to: newUser.email,
      subject: "Welcome to My Website",
      text: `Thank you for registering on our website! Your verification code is ${code}`,
    };

    await transporter.sendMail(mailOptions);

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

// get user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id, username } = req.params;
    const findUserbyUser = await prisma.users.findMany({
      // where: { id },
      where: {
        OR: [
          {
            id: id,
          },
          {
            username: username,
          },
        ],
      },
    });
    return res.status(200).json(findUserbyUser);
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == "P2006") {
      return res.status(400).json({
        message: "Your email have been used before",
      });
    } else {
      return res.status(500).json({
        message: "Server Error !",
      });
    }
  }
};
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password, code } = req.body ;

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check if verification code is correct
    if (user.code !== code) {
      return res.status(401).json({ message: "Invalid verification code" });
    }

    // update user's verification status
    const updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: { verified: true },
    });

    return res.status(200).json({ message: "Login successful", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const findUserbyUser = await prisma.users.findFirst({
      where: { email: email },
    });
    return res.status(200).json(findUserbyUser);
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == "P2006") {
      return res.status(400).json({
        message: "Your email have been used before",
      });
    } else {
      return res.status(500).json({
        message: "Server Error !",
      });
    }
  }
};
