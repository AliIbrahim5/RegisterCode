import { z } from "zod";

export const RegesterType = z.object({
  body: z.object({
    username: z.string({ required_error: "username is Required !" }),
    password: z.string({ required_error: "password is Required !" }),
    email: z.string({ required_error: "email is Required & must be unique !" }),
    phoneNumber: z.string({
      required_error: "phoneNumber is Required !",
      invalid_type_error: "must be unique",
    }),

    role: z.enum(["User", "Admin"], {
      required_error: "role is Required & must be ( User OR Admin ) !",
    }),

    joiningYear: z.string({ required_error: "joiningYear is Required !" }),
    age: z.number({ required_error: "username is Required !" }),
  }),
});
export type UserSchemaType = z.infer<typeof RegesterType>["body"];

export const VerifyCodeType = z.object({
  body: z.object({
    email: z.string({ required_error: "email is Required & must be unique !" }),
    code: z.string({ required_error: " !لم يتم ادخال  رقم التحقق" }),
  }),
});

export type VerifyCodeSchemaType = z.infer<typeof VerifyCodeType>["body"];

export const LoginType = z.object({
  body: z.object({
    email: z.string({ required_error: "email is Required & must be unique !" }),
    password: z.string({ required_error: "password is Required !" }),
  }),
});

export type LoginTypeSchemaType = z.infer<typeof LoginType>["body"];
