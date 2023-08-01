"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = exports.isCourier = exports.isAdmin = exports.isSuperAdmin = void 0;
const User_1 = __importDefault(require("../../models/User"));
const custom_error_1 = require("../../types/custom-error");
const jwt_1 = require("../../utils/jwt");
const checkRole = (role) => async (req, res, next) => {
    try {
        const token = req.headers["authorization"] &&
            req.headers["authorization"].split(" ")[1];
        if (!token)
            throw new custom_error_1.CustomError("Invalid token!", 401);
        const findUser = (0, jwt_1.verify)(token);
        const verifiedUser = await User_1.default.findOne({
            where: { email: findUser.email },
        });
        if (!verifiedUser || !verifiedUser.dataValues.is_verified)
            throw new custom_error_1.CustomError("Invalid token!", 401);
        req.verifiedUser = verifiedUser.dataValues;
        if (verifiedUser?.dataValues.role !== role)
            throw new custom_error_1.CustomError(`This route is only accessible by ${role}s!`, 403);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.isSuperAdmin = checkRole("superadmin");
exports.isAdmin = checkRole("admin");
exports.isCourier = checkRole("courier");
exports.isAuth = checkRole("user");