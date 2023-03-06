"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactRouter_1 = require("./Routes/contactRouter");
const app = (0, express_1.default)();
app.use(`/contact`, contactRouter_1.contactRoute);
app.listen(5000, () => {
    console.log("we running in port 5000 now ");
});
