import { Router } from "express";
import { getRestaurantCouriers, postRestaurantCouriers } from "../controllers/restaurant-courier.controller";
import isRestaurantAdmin from "../middlewares/is-restaurant-admin";

const router = Router();

router.post("/restaurant-courier", isRestaurantAdmin, postRestaurantCouriers);
router.get("/restaurant-couriers", isRestaurantAdmin,  getRestaurantCouriers);

export default router;