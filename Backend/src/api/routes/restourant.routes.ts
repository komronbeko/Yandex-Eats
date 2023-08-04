import { Router } from "express";
import { _delete, get_all, post, update } from "../controllers/restourant.controller";
import isAuth from "../middlewares/isAuth.middleware";
import isRestaurantAdmin from "../middlewares/is-restaurant-admin";

const router = Router();

router.post("/restaurant", isAuth, post);
router.get("/restaurants", get_all);
router.put("/restaurant/:id", isRestaurantAdmin, update);
router.delete("/restaurant/:id",isRestaurantAdmin,  _delete);

export default router;