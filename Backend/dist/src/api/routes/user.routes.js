"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const restourant_controller_1 = require("../controllers/restourant.controller");
const isAuth_middleware_1 = __importDefault(require("../middlewares/isAuth.middleware"));
const isAdmin_middleware_1 = __importDefault(require("../middlewares/isAdmin.middleware"));
const is_restaurant_admin_1 = __importDefault(require("../middlewares/is-restaurant-admin"));
const router = (0, express_1.Router)();
router.get("/users", isAdmin_middleware_1.default, user_controllers_1.get_all_users);
router.get("/couriers", is_restaurant_admin_1.default, user_controllers_1.get_all_couriers);
router.get("/user", isAuth_middleware_1.default, user_controllers_1.get_one_user);
router.put("/user", isAuth_middleware_1.default, user_controllers_1.update);
router.delete("/user", isAuth_middleware_1.default, restourant_controller_1._delete);
exports.default = router;
