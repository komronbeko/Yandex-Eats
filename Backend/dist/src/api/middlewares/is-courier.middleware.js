"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = require("../../types/custom-error");
const jwt_1 = require("../../utils/jwt");
const User_1 = __importDefault(require("../../models/User"));
const isCourier = async (req, res, next) => {
    try {
        const token = req.headers["authorization"] &&
            req.headers["authorization"].split(" ")[1];
        if (!token)
            throw new custom_error_1.CustomError("Invalid token!", 401);
        const findCourier = (0, jwt_1.verify)(token);
        const verifiedCourier = await User_1.default.findOne({
            where: { email: findCourier.email, role: "courier" },
        });
        if (verifiedCourier?.dataValues.is_verified ||
            verifiedCourier?.dataValues.role == "courier" ||
            verifiedCourier?.dataValues.role == "admin" ||
            verifiedCourier?.dataValues.role == "superadmin") {
            req.verifiedCourier =
                verifiedCourier.dataValues;
        }
        else {
            throw new custom_error_1.CustomError("Invalid token!", 401);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = isCourier;
