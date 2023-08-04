"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const stripe_1 = __importDefault(require("stripe"));
const custom_error_1 = require("../../types/custom-error");
const User_1 = __importDefault(require("../../models/User"));
const Order_1 = __importDefault(require("../../models/Order"));
const stripeService = new stripe_1.default("sk_test_51NXavzDU6UVW8TMJIUiWGby01OgMS2J0Pi4hZ66w9eajUY6tgR9FfMN814qlnxzqNifHObnVogFi39wyBci2fdSl00fPhEDzO2", { apiVersion: "2022-11-15" });
const convert = async (req, res, next) => {
    try {
        const { amount, payment_id, order_id } = req.body;
        const verifiedUser = req.verifiedUser;
        const findUser = await User_1.default.findOne({ where: { id: verifiedUser.id } });
        const findOrder = await Order_1.default.findOne({ where: { id: order_id } });
        if (!findOrder)
            throw new custom_error_1.CustomError("Order not found", 400);
        if (findUser?.dataValues.money < amount)
            throw new custom_error_1.CustomError("Not enough money", 400);
        const payment = await stripeService.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Payment",
            payment_method: payment_id,
            confirm: true,
        });
        await User_1.default.update({ money: findUser?.dataValues.money - amount }, {
            where: {
                id: findUser?.dataValues.id,
            },
        });
        await Order_1.default.update({ status: "paid" }, {
            where: {
                id: findOrder?.dataValues.id,
            },
        });
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports.convert = convert;
