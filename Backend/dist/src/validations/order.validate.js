"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const orderSchema = (payload) => {
    return joi_1.default.object({
        user_id: joi_1.default.number().required(),
        food_id: joi_1.default.number().required(),
        process: joi_1.default.string(),
    }).validate(payload);
};
exports.orderSchema = orderSchema;
