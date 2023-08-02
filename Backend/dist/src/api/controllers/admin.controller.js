"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAdmin = exports.restaurantVerify = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Restourant_1 = __importDefault(require("../../models/Restourant"));
const custom_error_1 = require("../../types/custom-error");
const restourant_validate_1 = require("../../validations/restourant.validate");
const user_validate_1 = require("../../validations/user.validate");
const User_1 = __importDefault(require("../../models/User"));
const sequelize_1 = require("sequelize");
const jwt_1 = require("../../utils/jwt");
const restaurantVerify = async (req, res, next) => {
    try {
        const { restaurant_id, is_verified } = req.body;
        const { error } = (0, restourant_validate_1.restaurantVerifySchema)({ restaurant_id, is_verified });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const findRestourant = await Restourant_1.default.findOne({
            where: { id: restaurant_id },
        });
        if (!findRestourant)
            throw new custom_error_1.CustomError("Restourant not found", 400);
        await Restourant_1.default.update({ is_verified: is_verified }, { where: { id: findRestourant.dataValues.id } });
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports.restaurantVerify = restaurantVerify;
const postAdmin = async (req, res, next) => {
    try {
        const { name, email, password, phone_number } = req.body;
        //VALIDATION
        const { error } = (0, user_validate_1.registerSchema)({ name, email, password, phone_number });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        //Finding an email and Hashing password
        const findUser = await User_1.default.findOne({
            where: { [sequelize_1.Op.or]: [{ name }, { email }] },
        });
        if (findUser)
            throw new custom_error_1.CustomError("User already exist!", 403);
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        //NEWUSER
        await User_1.default.create({
            name,
            email,
            password: hashedPassword,
            phone_number,
            role: "admin",
            is_verified: true,
        });
        // TOKEN
        const token = (0, jwt_1.sign)({ email });
        res.status(200).json({
            message: "New admin is successfully added!"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.postAdmin = postAdmin;
