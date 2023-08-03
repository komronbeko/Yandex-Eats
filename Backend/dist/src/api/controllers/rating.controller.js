"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = exports.post = void 0;
const custom_error_1 = require("../../types/custom-error");
const Restourant_1 = __importDefault(require("../../models/Restourant"));
const rating_validate_1 = require("../../validations/rating.validate");
const Rating_1 = __importDefault(require("../../models/Rating"));
const User_1 = __importDefault(require("../../models/User"));
const post = async (req, res, next) => {
    try {
        const { stars, restaurant_id } = req.body;
        const { id: user_id } = req.verifiedUser;
        const { error } = (0, rating_validate_1.ratingSchema)({
            restaurant_id, stars, user_id
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const findRestaurant = await Restourant_1.default.findOne({
            where: { id: restaurant_id },
        });
        if (!findRestaurant)
            throw new custom_error_1.CustomError("Restaurant not found", 400);
        await Rating_1.default.create({ stars, restaurant_id, user_id });
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports.post = post;
const get_all = async (req, res, next) => {
    try {
        const data = await Rating_1.default.findAll({
            include: [
                {
                    model: Restourant_1.default,
                    attributes: ["name", "contact_number"]
                },
                {
                    model: User_1.default,
                    attributes: ["name", "email", "phone_number"]
                }
            ],
        });
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        next(error);
    }
};
exports.get_all = get_all;
