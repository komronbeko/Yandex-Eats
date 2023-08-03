"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rating_controller_1 = require("../controllers/rating.controller");
const isAuth_middleware_1 = __importDefault(require("../middlewares/isAuth.middleware"));
const router = (0, express_1.Router)();
router.get("/ratings", rating_controller_1.get_all);
router.post("/rating", isAuth_middleware_1.default, rating_controller_1.post);
exports.default = router;
