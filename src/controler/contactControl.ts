import { Request, Response } from "express";
import { contactRoute } from "../Routes/contactRouter";
import { contactSchema, ContactType } from "../schemas/contactSchema";

let conactsArr: ContactType["body"][] = [];

export const getContact = (res: Response, req: Request) => {
  return res.status(200).json(conactsArr);
};

export const postContact = (res: Response, req: Request) => {
  const newContact = req.body as ContactType["body"];
  conactsArr.push(newContact);
  return res.status(201).json({
    message: "contact added !",
  });
};

export const updateContact = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedContact = req.body as ContactType["body"];
  const filterContact = conactsArr.filter((fil) => {
    return fil.id !== id;
  });

  filterContact.push(updatedContact);

  conactsArr = filterContact;

  return res.status(201).json({
    message: "contact updated !",
  });
};
