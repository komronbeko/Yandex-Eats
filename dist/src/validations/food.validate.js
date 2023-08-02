"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const foodSchema = (payload) => {
    return joi_1.default.object({
        name: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        weight: joi_1.default.number().required(),
        restourant_id: joi_1.default.number().required(),
    }).validate(payload);
};
exports.foodSchema = foodSchema;
