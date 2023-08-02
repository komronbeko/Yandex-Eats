"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_courier_controller_1 = require("../controllers/restaurant-courier.controller");
const is_restaurant_admin_1 = __importDefault(require("../middlewares/is-restaurant-admin"));
const router = (0, express_1.Router)();
router.post("/restaurant-courier", is_restaurant_admin_1.default, restaurant_courier_controller_1.postRestaurantCouriers);
router.get("/restaurant-couriers", is_restaurant_admin_1.default, restaurant_courier_controller_1.getRestaurantCouriers);
exports.default = router;
