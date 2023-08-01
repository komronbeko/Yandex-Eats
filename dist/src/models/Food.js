"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = require("../../config/db/connections");
class Food extends sequelize_1.Model {
    id;
    name;
    price;
    weight;
    restourant_id;
    created_at;
    updated_at;
}
Food.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    restourant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "foods",
    sequelize: connections_1.sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = Food;
