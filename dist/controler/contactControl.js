"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = exports.postContact = exports.getContact = void 0;
let conactsArr = [];
const getContact = (res, req) => {
    return res.status(200).json(conactsArr);
};
exports.getContact = getContact;
const postContact = (res, req) => {
    const newContact = req.body;
    conactsArr.push(newContact);
    return res.status(201).json({
        message: "contact added !",
    });
};
exports.postContact = postContact;
const updateContact = (req, res) => {
    const { id } = req.params;
    const updatedContact = req.body;
    const filterContact = conactsArr.filter((fil) => {
        return fil.id !== id;
    });
    filterContact.push(updatedContact);
    conactsArr = filterContact;
    return res.status(201).json({
        message: "contact updated !",
    });
};
exports.updateContact = updateContact;
