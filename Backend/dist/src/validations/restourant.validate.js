"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantVerifySchema = exports.restourantSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const restourantSchema = (payload) => {
    return joi_1.default.object({
        name: joi_1.default.string().required(),
        owner: joi_1.default.string().required(),
        business_hours: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        contact_number: joi_1.default.string().required(),
        card_detailts: {
            card_number: joi_1.default.number().required(),
            cvv: joi_1.default.number().required(),
            expiration_date: joi_1.default.string().required(),
        },
        longitude: joi_1.default.string().required(),
        latitude: joi_1.default.string().required(),
        founded_at: joi_1.default.number().required(),
    }).validate(payload);
};
exports.restourantSchema = restourantSchema;
const restaurantVerifySchema = (payload) => {
    return joi_1.default.object({
        restaurant_id: joi_1.default.number().required(),
        is_verified: joi_1.default.boolean().required(),
    }).validate(payload);
};
exports.restaurantVerifySchema = restaurantVerifySchema;
