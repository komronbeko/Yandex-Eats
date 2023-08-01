"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = exports.restourant_register = void 0;
const restourant_validate_1 = require("../../validations/restourant.validate");
const custom_error_1 = require("../../types/custom-error");
const Restourant_1 = __importDefault(require("../../models/Restourant"));
const restourant_register = async (req, res, next) => {
    try {
        const { name, owner, business_hours, email, contact_number, card_detailts, longitude, latitude, founded_at, } = req.body;
        const { error } = (0, restourant_validate_1.restourantSchema)({
            name,
            owner,
            business_hours,
            email,
            contact_number,
            card_detailts,
            longitude,
            latitude,
            founded_at,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        await Restourant_1.default.create({
            name,
            owner,
            business_hours,
            email,
            contact_number,
            card_detailts,
            longitude,
            latitude,
            founded_at,
        });
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.restourant_register = restourant_register;
const get_all = async (req, res, next) => {
    try {
        const data = await Restourant_1.default.findAll();
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.get_all = get_all;
