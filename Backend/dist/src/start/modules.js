"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("../api/routes/index"));
const error_handler_1 = require("../api/middlewares/error-handler");
const modules = async (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use(index_1.default);
    app.use(error_handler_1.errorHandler);
};
exports.default = modules;
