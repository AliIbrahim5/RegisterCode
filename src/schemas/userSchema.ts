import { z } from "zod";

export const userSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "username is Required !" }),
    password: z.string({ required_error: "password is Required !" }),
    email: z.string({ required_error: "email is Required & must be unique !" }),
    role: z.enum(["User", "Admin"], {
      required_error: "role is Required & must be ( User OR Admin ) !",
    }),

    joiningYear: z.string({ required_error: "joiningYear is Required !" }),
    age: z.number({ required_error: "username is Required !" }),
  }),
});

export type UserSchemaType = z.infer<typeof userSchema>;
