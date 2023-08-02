"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const restourant_routes_1 = __importDefault(require("./restourant.routes"));
const food_routes_1 = __importDefault(require("./food.routes"));
const courier_routes_1 = __importDefault(require("./courier.routes"));
exports.default = [auth_routes_1.default, restourant_routes_1.default, food_routes_1.default, courier_routes_1.default];
