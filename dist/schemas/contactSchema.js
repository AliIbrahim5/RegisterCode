"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchema = void 0;
const zod_1 = require("zod");
exports.contactSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z
            .string({ required_error: "ID is required !" })
            .min(3, "ID must be more than 2 !"),
        name: zod_1.z
            .string({ required_error: "Name is required !" })
            .min(3, "Name must be more than 2 !"),
        phone: zod_1.z
            .string({ required_error: "Phnone number is required !" })
            .min(10, "Phone number must be equal 10 numbers !")
            .max(10, "Phone number must be equal 10 numbers !"),
    }),
});
