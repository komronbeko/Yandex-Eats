"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const superadmin_controller_1 = require("../controllers/superadmin.controller");
const isAdmin_middleware_1 = __importDefault(require("../middlewares/isAdmin.middleware"));
const isAuth_middleware_1 = __importDefault(require("../middlewares/isAuth.middleware"));
const isSuperAdmin_middleware_1 = __importDefault(require("../middlewares/isSuperAdmin.middleware"));
const router = (0, express_1.Router)();
router.post("/auth/register/admin", isAuth_middleware_1.default, isSuperAdmin_middleware_1.default, superadmin_controller_1.addAdmin);
router.put("/admin/edit/:id", isAuth_middleware_1.default, isSuperAdmin_middleware_1.default, superadmin_controller_1.editAdmin);
router.delete("/delete/:id", isAuth_middleware_1.default, isAdmin_middleware_1.default, superadmin_controller_1.deleteAnyone);
router.get("/users", isAuth_middleware_1.default, isAdmin_middleware_1.default, superadmin_controller_1.users);
router.get("/admins", isAuth_middleware_1.default, isSuperAdmin_middleware_1.default, superadmin_controller_1.admins);
router.get("/couriers", isAuth_middleware_1.default, isAdmin_middleware_1.default, superadmin_controller_1.couriers);
exports.default = router;
