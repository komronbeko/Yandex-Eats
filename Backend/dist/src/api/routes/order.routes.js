"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_middleware_1 = __importDefault(require("../middlewares/isAuth.middleware"));
const orders_controller_1 = require("../controllers/orders.controller");
const router = (0, express_1.Router)();
router.get("/cart-orders", isAuth_middleware_1.default, orders_controller_1.orders_in_carts);
router.post("/order", isAuth_middleware_1.default, orders_controller_1.post_order);
router.delete("/order-delete/:id", isAuth_middleware_1.default, orders_controller_1.delete_from_order);
exports.default = router;
