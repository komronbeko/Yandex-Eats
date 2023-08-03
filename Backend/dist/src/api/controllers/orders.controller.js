"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_from_order = exports.orders_in_carts = exports.post_order = void 0;
const custom_error_1 = require("../../types/custom-error");
const Food_1 = __importDefault(require("../../models/Food"));
const order_validate_1 = require("../../validations/order.validate");
const Order_1 = __importDefault(require("../../models/Order"));
const post_order = async (req, res, next) => {
    try {
        const { food_id, process } = req.body;
        const { id: user_id } = req.verifiedUser;
        const { error } = (0, order_validate_1.orderSchema)({
            user_id,
            food_id,
            process,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const findFood = await Food_1.default.findOne({
            where: { id: food_id },
        });
        if (!findFood)
            throw new custom_error_1.CustomError("Food not found", 400);
        const findOrder = await Order_1.default.findOne({
            where: { user_id, food_id, process: "ongoing" },
        });
        if (findOrder) {
            await Order_1.default.update({
                count: findOrder.dataValues.count + 1,
                total: findOrder.dataValues.price * (findOrder.dataValues.count + 1),
            }, { where: { id: findOrder.dataValues.id } });
        }
        else {
            await Order_1.default.create({
                food_id,
                process,
                user_id,
                food_name: findFood.dataValues.name,
                price: findFood.dataValues.price,
                total: findFood.dataValues.price,
            });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports.post_order = post_order;
const orders_in_carts = async (req, res, next) => {
    try {
        const verifiedUser = req.verifiedUser;
        const data = await Order_1.default.findAll({
            where: {
                user_id: verifiedUser.id,
                process: "ongoing"
            },
            attributes: ["food_name", "price", "count", "total", "process"],
        });
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        next(error);
    }
};
exports.orders_in_carts = orders_in_carts;
const delete_from_order = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const findOrder = await Order_1.default.findOne({ where: { id } });
        if (!findOrder)
            throw new custom_error_1.CustomError("Order not found", 400);
        else if (findOrder.dataValues.count == 1) {
            await Order_1.default.destroy({ where: { id } });
        }
        else if (findOrder.dataValues.count > 1) {
            await Order_1.default.update({
                count: findOrder.dataValues.count - 1,
                total: findOrder.dataValues.price * (findOrder.dataValues.count - 1),
            }, {
                where: { id: findOrder.dataValues.id },
            });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports.delete_from_order = delete_from_order;
