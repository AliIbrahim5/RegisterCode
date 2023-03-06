"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoute = void 0;
const express_1 = __importDefault(require("express"));
const contactControl_1 = require("../controler/contactControl");
const validate_1 = __importDefault(require("../middleware/validate"));
const contactSchema_1 = require("../schemas/contactSchema");
exports.contactRoute = express_1.default.Router();
exports.contactRoute.get(`/`, contactControl_1.getContact);
exports.contactRoute.post(`/`, (0, validate_1.default)(contactSchema_1.contactSchema), contactControl_1.postContact);
