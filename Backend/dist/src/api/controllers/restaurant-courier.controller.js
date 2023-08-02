"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantCouriers = exports.postRestaurantCouriers = void 0;
const User_1 = __importDefault(require("../../models/User"));
const Restaurant_couriers_1 = __importDefault(require("../../models/Restaurant-couriers"));
const Restourant_1 = __importDefault(require("../../models/Restourant"));
const custom_error_1 = require("../../types/custom-error");
const postRestaurantCouriers = async (req, res, next) => {
    try {
        const { courier_id } = req.body;
        const restaurant = req.verifiedRestaurant;
        const findCourier = await User_1.default.findOne({
            where: { id: courier_id },
        });
        if (!findCourier)
            throw new custom_error_1.CustomError("Courier not found", 400);
        await Restaurant_couriers_1.default.create({
            UserId: courier_id,
            RestourantId: restaurant.id,
        });
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.postRestaurantCouriers = postRestaurantCouriers;
const getRestaurantCouriers = async (req, res) => {
    try {
        const data = await Restaurant_couriers_1.default.findAll({
            include: [
                {
                    model: Restourant_1.default,
                    attributes: ["name", "owner"],
                },
                {
                    model: User_1.default,
                    attributes: ["name", "email"],
                },
            ],
        });
        res.status(200).json({ message: "OK", data });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getRestaurantCouriers = getRestaurantCouriers;
