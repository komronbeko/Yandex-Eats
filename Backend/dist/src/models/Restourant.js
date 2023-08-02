"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = require("../../config/db/connections");
class Restourant extends sequelize_1.Model {
    id;
    name;
    owner;
    business_hours;
    email;
    password;
    role;
    contact_number;
    card_detailts;
    longitude;
    latitude;
    founded_at;
    is_verified;
    created_at;
    updated_at;
}
Restourant.init({
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
    owner: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    business_hours: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contact_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'restaurant_admin',
    },
    card_detailts: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    founded_at: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: "restourants",
    sequelize: connections_1.sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = Restourant;
