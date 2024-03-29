"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = require("../../config/db/connections");
class User extends sequelize_1.Model {
    id;
    name;
    email;
    password;
    phone_number;
    is_verified;
    role;
    money;
    created_at;
    updated_at;
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'courier', 'user', 'superadmin'),
        defaultValue: 'user',
        allowNull: false
    },
    money: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: "users",
    sequelize: connections_1.sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = User;
