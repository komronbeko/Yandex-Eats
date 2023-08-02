"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connections_1 = require("../../config/db/connections");
const sequelize_1 = require("sequelize");
class RestaurantCouriers extends sequelize_1.Model {
    id;
    created_at;
    updated_at;
}
RestaurantCouriers.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
}, {
    sequelize: connections_1.sequelize,
    tableName: "restaurant_couriers",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = RestaurantCouriers;
