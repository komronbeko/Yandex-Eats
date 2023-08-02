import { Router } from "express";
import { _delete, get_all, post, update } from "../controllers/food.controller";
import isRestaurantAdmin from "../middlewares/is-restaurant-admin";

const router = Router();

router.get("/foods", get_all);
router.post("/food", isRestaurantAdmin, post);
router.put("/food/:id", isRestaurantAdmin, update);
router.delete("/food/:id", isRestaurantAdmin, _delete);

export default router;