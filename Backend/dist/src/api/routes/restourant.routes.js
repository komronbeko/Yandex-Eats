"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restourant_controller_1 = require("../controllers/restourant.controller");
const isAuth_middleware_1 = __importDefault(require("../middlewares/isAuth.middleware"));
const is_restaurant_admin_1 = __importDefault(require("../middlewares/is-restaurant-admin"));
const router = (0, express_1.Router)();
router.post("/restaurant", isAuth_middleware_1.default, restourant_controller_1.post);
router.get("/restaurants", restourant_controller_1.get_all);
router.put("/restaurant/:id", is_restaurant_admin_1.default, restourant_controller_1.update);
router.delete("/restaurant/:id", is_restaurant_admin_1.default, restourant_controller_1._delete);
exports.default = router;
