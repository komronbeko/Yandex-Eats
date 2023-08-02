import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.middleware";
import { restaurantVerify } from "../controllers/admin.controller";

const router = Router();

router.put("/restaurant-verify", isAdmin, restaurantVerify);

export default router;
