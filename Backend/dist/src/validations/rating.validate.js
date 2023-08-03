"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const ratingSchema = (payload) => {
    return joi_1.default.object({
        stars: joi_1.default.number().required(),
        restaurant_id: joi_1.default.number().required(),
        user_id: joi_1.default.number().required(),
    }).validate(payload);
};
exports.ratingSchema = ratingSchema;
