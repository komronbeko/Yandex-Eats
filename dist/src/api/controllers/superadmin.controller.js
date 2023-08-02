"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couriers = exports.admins = exports.users = exports.deleteAnyone = exports.editAdmin = exports.addAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("../../models/User"));
const custom_error_1 = require("../../types/custom-error");
const user_validate_1 = require("../../validations/user.validate");
const jwt_1 = require("../../utils/jwt");
//--------SUPERADMIN CAN ADD NEW ADMINS--------------------------------
const addAdmin = async (req, res, next) => {
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
            message: "New admin is successfully added!",
            token,
            role: "admin",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addAdmin = addAdmin;
//--------SUPERADMIN CAN EDIT ONLY ADMINS ACCOUNT--------------------------------
const editAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        //CHECKING IF ID IS ADMIN'S ID
        const findUser = await User_1.default.findOne({ where: { id } });
        if (findUser?.dataValues.role != "admin")
            throw new custom_error_1.CustomError("Superadmin can only edit admin's account!", 403);
        const { name, email, password, phone_number } = req.body;
        //VALIDATION
        const { error } = (0, user_validate_1.editAccountSchema)({ name, email, password, phone_number });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        //EDITING
        await User_1.default.update({ name, email, password, phone_number }, {
            where: {
                id,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editAdmin = editAdmin;
//--------SUPERADMIN CAN DELETE ANYONE, ADMIN CAN DELETE ANYONE EXCEPT ADMINS)--------------------------------
const deleteAnyone = async (req, res, next) => {
    try {
        const verifiedUser = req.verifiedUser;
        const { id } = req.params;
        const findUser = await User_1.default.findOne({ where: { id } });
        //ADMIN CAN DELETE ANYONE EXCEPT ADMINS
        if (verifiedUser.role === "admin" && findUser?.dataValues.role === "admin")
            throw new custom_error_1.CustomError("Admin can be deleted only by superadmin", 403);
        await User_1.default.destroy({
            where: { id },
        });
        res.status(200).json({
            message: `${findUser?.dataValues.name}(${findUser?.dataValues.role}) deleted successfully`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAnyone = deleteAnyone;
//--------SUPERADMIN AND ADMINS CAN GET ALL USERS--------------------------------
const users = async (req, res, next) => {
    try {
        const users = await User_1.default.findAll({
            where: {
                role: "user",
            },
        });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.users = users;
//--------ONLY SUPERADMIN CAN GET ALL ADMINS--------------------------------
const admins = async (req, res, next) => {
    try {
        const admins = await User_1.default.findAll({
            where: {
                role: "admin",
            },
        });
        res.json(admins);
    }
    catch (error) {
        next(error);
    }
};
exports.admins = admins;
//--------SUPERADMIN AND ADMINS CAN GET ALL COURIERS--------------------------------
const couriers = async (req, res, next) => {
    try {
        const couriers = await User_1.default.findAll({
            where: {
                role: "courier",
            },
        });
        res.json(couriers);
    }
    catch (error) {
        next(error);
    }
};
exports.couriers = couriers;
