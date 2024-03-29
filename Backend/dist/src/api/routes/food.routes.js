"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_controller_1 = require("../controllers/food.controller");
const is_restaurant_admin_1 = __importDefault(require("../middlewares/is-restaurant-admin"));
const router = (0, express_1.Router)();
router.get("/foods", food_controller_1.get_all);
router.post("/food", is_restaurant_admin_1.default, food_controller_1.post);
router.put("/food/:id", is_restaurant_admin_1.default, food_controller_1.update);
router.delete("/food/:id", is_restaurant_admin_1.default, food_controller_1._delete);
exports.default = router;
