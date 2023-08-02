"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    PORT: process.env.PORT || 7777,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
    PAYMENT_API_KEY: process.env.PAYMENT_API_KEY
};
exports.default = config;
