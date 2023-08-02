"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = exports.update = exports.get_all = exports.post = void 0;
const custom_error_1 = require("../../types/custom-error");
const Restourant_1 = __importDefault(require("../../models/Restourant"));
const courier_validate_1 = require("../../validations/courier.validate");
const Courier_1 = __importDefault(require("../../models/Courier"));
const post = async (req, res, next) => {
    try {
        const { name, email, password, phone_number, restaurant_id } = req.body;
        const { error } = (0, courier_validate_1.courierSchema)({
            name,
            email,
            password,
            phone_number,
            restaurant_id,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const findRestaurant = await Restourant_1.default.findOne({
            where: { id: restaurant_id },
        });
        if (!findRestaurant)
            throw new custom_error_1.CustomError("Restaurant not found", 400);
        await Courier_1.default.create({
            name,
            email,
            password,
            phone_number,
            restaurant_id,
        });
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.post = post;
const get_all = async (req, res, next) => {
    try {
        const data = await Courier_1.default.findAll({
            include: [
                {
                    model: Restourant_1.default,
                },
            ],
        });
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.get_all = get_all;
const update = async (req, res, next) => {
    try {
        const { name, email, password, phone_number } = req.body;
        const { id } = req.params;
        const { error } = (0, courier_validate_1.courierSchema)({
            name,
            email,
            password,
            phone_number
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const findCourier = await Courier_1.default.findOne({
            where: { id },
        });
        if (!findCourier)
            throw new custom_error_1.CustomError("Courier not found", 400);
        else {
            await Courier_1.default.update({
                name,
                email,
                password,
                phone_number
            }, { where: { id: findCourier.dataValues.id } });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.update = update;
const _delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findCourier = await Courier_1.default.findOne({ where: { id } });
        if (!findCourier)
            throw new custom_error_1.CustomError("Courier not found", 400);
        else {
            await Courier_1.default.destroy({
                where: { id: findCourier.dataValues.id },
            });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports._delete = _delete;
