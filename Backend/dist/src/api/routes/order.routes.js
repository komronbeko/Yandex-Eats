"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const is_restaurant_admin_1 = __importDefault(require("../middlewares/is-restaurant-admin"));
const isAuth_middleware_1 = __importDefault(require("../middlewares/isAuth.middleware"));
const orders_controller_1 = require("../controllers/orders.controller");
const is_courier_middleware_1 = __importDefault(require("../middlewares/is-courier.middleware"));
const router = (0, express_1.Router)();
router.get("/cart-orders", isAuth_middleware_1.default, orders_controller_1.orders_in_carts);
router.get("/paid-orders", is_restaurant_admin_1.default, orders_controller_1.paid_orders);
router.get("/ready-orders", is_courier_middleware_1.default);
router.put("/order-ready", is_restaurant_admin_1.default, orders_controller_1.order_ready);
router.post("/order", isAuth_middleware_1.default, orders_controller_1.post_order);
router.delete("/order-delete/:id", isAuth_middleware_1.default, orders_controller_1.delete_from_order);
exports.default = router;
