"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editAccountSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerSchema = (payload) => {
    return joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        phone_number: joi_1.default.string()
            .regex(/^\+998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
            .required(),
        role: joi_1.default.string()
    }).validate(payload);
};
exports.registerSchema = registerSchema;
const loginSchema = (payload) => {
    return joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }).validate(payload);
};
exports.loginSchema = loginSchema;
const editAccountSchema = (payload) => {
    return joi_1.default.object({
        name: joi_1.default.string(),
        email: joi_1.default.string().email(),
        password: joi_1.default.string(),
        phone_number: joi_1.default.string().regex(/^\+998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/),
    }).validate(payload);
};
exports.editAccountSchema = editAccountSchema;
