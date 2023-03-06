import express from "express";
import { getContact, postContact } from "../controler/contactControl";
import validate from "../middleware/validate";
import { ContactType, contactSchema } from "../schemas/contactSchema";

export const contactRoute = express.Router();

contactRoute.get(`/`, getContact);

contactRoute.post(`/`, validate(contactSchema), postContact);

