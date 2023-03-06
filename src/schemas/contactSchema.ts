import { z } from "zod";

export const contactSchema = z.object({
  body: z.object({
    id: z
      .string({ required_error: "ID is required !" })
      .min(3, "ID must be more than 2 !"),
    name: z
      .string({ required_error: "Name is required !" })
      .min(3, "Name must be more than 2 !"),
    phone: z
      .string({ required_error: "Phnone number is required !" })
      .min(10, "Phone number must be equal 10 numbers !")
      .max(10, "Phone number must be equal 10 numbers !"),
  }),
});

export type ContactType = z.infer<typeof contactSchema>;
