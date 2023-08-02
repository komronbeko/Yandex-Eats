"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const superadmin_routes_1 = __importDefault(require("./superadmin.routes"));
exports.default = [auth_routes_1.default, superadmin_routes_1.default];
