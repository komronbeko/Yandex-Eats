"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = exports.update = exports.get_all = exports.post = void 0;
const custom_error_1 = require("../../types/custom-error");
const food_validate_1 = require("../../validations/food.validate");
const Food_1 = __importDefault(require("../../models/Food"));
const Restourant_1 = __importDefault(require("../../models/Restourant"));
const post = async (req, res, next) => {
    try {
        const { name, price, weight } = req.body;
        const { id: restourant_id } = req.verifiedRestaurant;
        const { error } = (0, food_validate_1.foodSchema)({
            name,
            price,
            weight,
            restourant_id,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const findRestourant = await Restourant_1.default.findOne({
            where: { id: restourant_id },
        });
        if (!findRestourant)
            throw new custom_error_1.CustomError("Restourant not found", 400);
        await Food_1.default.create({ name, price, weight, restourant_id });
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports.post = post;
const get_all = async (req, res, next) => {
    try {
        const data = await Food_1.default.findAll({
            include: [
                {
                    model: Restourant_1.default,
                    attributes: ["name", "contact_number"]
                },
            ],
        });
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        next(error);
    }
};
exports.get_all = get_all;
const update = async (req, res, next) => {
    try {
        const { name, price, weight } = req.body;
        const { id } = req.params;
        const { error } = (0, food_validate_1.foodSchema)({
            name,
            price,
            weight,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const findFood = await Food_1.default.findOne({ where: { id } });
        if (!findFood)
            throw new custom_error_1.CustomError("Food not found", 400);
        else {
            await Food_1.default.update({
                name,
                price,
                weight,
            }, { where: { id: findFood.dataValues.id } });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const _delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findFood = await Food_1.default.findOne({ where: { id } });
        if (!findFood)
            throw new custom_error_1.CustomError("Food not found", 400);
        else {
            await Food_1.default.destroy({
                where: { id: findFood.dataValues.id },
            });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports._delete = _delete;
