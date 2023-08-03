"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const restourant_routes_1 = __importDefault(require("./restourant.routes"));
const food_routes_1 = __importDefault(require("./food.routes"));
// import superadmin from "./superadmin.routes";
const user_routes_1 = __importDefault(require("./user.routes"));
const restaurant_courier_routes_1 = __importDefault(require("./restaurant-courier.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
exports.default = [auth_routes_1.default, restourant_routes_1.default, food_routes_1.default, user_routes_1.default, restaurant_courier_routes_1.default, admin_routes_1.default];
