"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = exports.update = exports.get_near = exports.get_one = exports.get_all = exports.post = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const restourant_validate_1 = require("../../validations/restourant.validate");
const custom_error_1 = require("../../types/custom-error");
const Restourant_1 = __importDefault(require("../../models/Restourant"));
const Food_1 = __importDefault(require("../../models/Food"));
const Rating_1 = __importDefault(require("../../models/Rating"));
const connections_1 = require("../../../config/db/connections");
const sequelize_1 = require("sequelize");
const post = async (req, res, next) => {
    try {
        const { name, owner, business_hours, email, password, contact_number, card_details, longitude, latitude, founded_at, } = req.body;
        const { error } = (0, restourant_validate_1.restourantSchema)({
            name,
            owner,
            business_hours,
            email,
            password,
            contact_number,
            card_details,
            longitude,
            latitude,
            founded_at,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        await Restourant_1.default.create({
            name,
            owner,
            business_hours,
            email,
            password: hashedPassword,
            contact_number,
            card_details,
            longitude,
            latitude,
            founded_at,
        });
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports.post = post;
const get_all = async (req, res, next) => {
    try {
        const data = await Restourant_1.default.findAll({
            include: [
                {
                    model: Rating_1.default,
                    attributes: [
                        [connections_1.sequelize.fn("AVG", connections_1.sequelize.col("stars")), "average_rating"],
                    ],
                },
                {
                    model: Food_1.default,
                },
            ],
            group: ["Restourant.id", "Ratings.id", "Food.id"],
        });
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        next(error);
    }
};
exports.get_all = get_all;
const get_one = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findRestaurant = await Restourant_1.default.findOne({ where: { id } });
        if (!findRestaurant)
            throw new custom_error_1.CustomError("Restaurant, not found", 400);
        const data = await Restourant_1.default.findOne({
            include: [
                {
                    model: Rating_1.default,
                    attributes: [
                        [connections_1.sequelize.fn("AVG", connections_1.sequelize.col("stars")), "average_rating"],
                    ],
                },
                {
                    model: Food_1.default,
                },
            ],
            group: ["Restourant.id", "Ratings.id", "Food.id"],
            where: { id: findRestaurant.dataValues.id }
        });
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        next(error);
    }
};
exports.get_one = get_one;
const get_near = async (req, res, next) => {
    try {
        const { longitude, latitude } = req.query;
        const distance = 3;
        const minLatitude = latitude - distance / 111;
        const maxLatitude = latitude + distance / 111;
        const minLongitude = longitude - distance / (111 * Math.cos(latitude));
        const maxLongitude = longitude + distance / (111 * Math.cos(latitude));
        const restaurants = await Restourant_1.default.findAll({
            where: {
                latitude: {
                    [sequelize_1.Op.between]: [minLatitude, maxLatitude],
                },
                longitude: {
                    [sequelize_1.Op.between]: [minLongitude, maxLongitude],
                },
            },
            limit: 10, // Limit the number of results to 10
        });
        res.status(200).json({ message: "success", data: restaurants });
    }
    catch (error) {
        next(error);
    }
};
exports.get_near = get_near;
const update = async (req, res, next) => {
    try {
        const { name, owner, business_hours, email, password, contact_number, card_details, longitude, latitude, founded_at, } = req.body;
        const { id } = req.params;
        const { error } = (0, restourant_validate_1.restourantSchema)({
            name,
            owner,
            business_hours,
            email,
            password,
            contact_number,
            card_details,
            longitude,
            latitude,
            founded_at,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const findRestourant = await Restourant_1.default.findOne({ where: { id } });
        if (!findRestourant)
            throw new custom_error_1.CustomError("Restourant not found", 400);
        else {
            await Restourant_1.default.update({
                name,
                owner,
                business_hours,
                email,
                contact_number,
                card_details,
                longitude,
                latitude,
                founded_at,
            }, { where: { id: findRestourant.dataValues.id } });
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
        const findRestourant = await Restourant_1.default.findOne({ where: { id } });
        if (!findRestourant)
            throw new custom_error_1.CustomError("Restourant not found", 400);
        else {
            await Restourant_1.default.destroy({
                where: { id: findRestourant.dataValues.id },
            });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        next(error);
    }
};
exports._delete = _delete;
