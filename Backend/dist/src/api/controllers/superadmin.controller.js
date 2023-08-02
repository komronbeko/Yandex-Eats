"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admins = exports.editAdmin = void 0;
const User_1 = __importDefault(require("../../models/User"));
const custom_error_1 = require("../../types/custom-error");
const user_validate_1 = require("../../validations/user.validate");
//--------SUPERADMIN CAN ADD NEW ADMINS--------------------------------
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
