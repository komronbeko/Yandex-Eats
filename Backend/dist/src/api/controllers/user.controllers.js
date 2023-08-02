"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = exports.update = exports.get_one_user = exports.get_all_couriers = exports.get_all_users = void 0;
const User_1 = __importDefault(require("../../models/User"));
const user_validate_1 = require("../../validations/user.validate");
const custom_error_1 = require("../../types/custom-error");
const get_all_users = async (req, res, next) => {
    try {
        const data = await User_1.default.findAll();
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        next(error);
    }
};
exports.get_all_users = get_all_users;
const get_all_couriers = async (req, res, next) => {
    try {
        const data = await User_1.default.findAll({ where: { role: "courier" } });
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        next(error);
    }
};
exports.get_all_couriers = get_all_couriers;
const get_one_user = async (req, res, next) => {
    try {
        const { id } = req.verifiedUser;
        const user = await User_1.default.findOne({ where: { id } });
        res.status(200).json({ message: "success", data: user });
    }
    catch (error) {
        next(error);
    }
};
exports.get_one_user = get_one_user;
const update = async (req, res, next) => {
    try {
        const { name, email, password, phone_number } = req.body;
        const { id } = req.verifiedUser;
        const { error } = (0, user_validate_1.registerSchema)({
            name,
            email,
            password,
            phone_number
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const findUser = await User_1.default.findOne({
            where: { id },
        });
        if (!findUser)
            throw new custom_error_1.CustomError("User not found", 400);
        else {
            await User_1.default.update({
                name,
                email,
                password,
                phone_number
            }, { where: { id: findUser.dataValues.id } });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const _delete = async (req, res, next) => {
    try {
        const { id } = req.verifiedUser;
        const findUser = await User_1.default.findOne({ where: { id } });
        if (!findUser)
            throw new custom_error_1.CustomError("User not found", 400);
        else {
            await User_1.default.destroy({
                where: { id: findUser.dataValues.id },
            });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports._delete = _delete;
