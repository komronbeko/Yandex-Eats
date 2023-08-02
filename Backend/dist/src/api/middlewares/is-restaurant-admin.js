"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Restourant_1 = __importDefault(require("../../models/Restourant"));
const custom_error_1 = require("../../types/custom-error");
const jwt_1 = require("../../utils/jwt");
const isRestaurantAdmin = async (req, res, next) => {
    try {
        const token = req.headers["authorization"] &&
            req.headers["authorization"].split(" ")[1];
        if (!token)
            throw new custom_error_1.CustomError("Invalid token!", 401);
        const findRestourant = (0, jwt_1.verify)(token);
        const verifiedRestaurant = await Restourant_1.default.findOne({
            where: { email: findRestourant.email },
        });
        if (!verifiedRestaurant?.dataValues.is_verified ||
            verifiedRestaurant?.dataValues.role !== "restaurant_admin" ||
            verifiedRestaurant?.dataValues.role !== "admin" ||
            verifiedRestaurant?.dataValues.role !== "superadmin")
            throw new custom_error_1.CustomError("Invalid token!", 401);
        req.verifiedRestaurant =
            verifiedRestaurant.dataValues;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = isRestaurantAdmin;
