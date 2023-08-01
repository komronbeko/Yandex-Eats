"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crud_controller_1 = require("../controllers/crud.controller");
//----------------------------------------------------------------//
const router = (0, express_1.Router)();
router.get("/", crud_controller_1.CrudGet);
router.post("/", crud_controller_1.CrudPost);
router.delete("/:id", crud_controller_1.CrudDelete);
// router.put("/:id", CrudPut);
//----------------------------------------------------------------//
exports.default = router;
