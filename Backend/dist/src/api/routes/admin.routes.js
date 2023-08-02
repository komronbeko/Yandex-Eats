"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAdmin_middleware_1 = __importDefault(require("../middlewares/isAdmin.middleware"));
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
router.put("/restaurant-verify", isAdmin_middleware_1.default, admin_controller_1.restaurantVerify);
exports.default = router;
