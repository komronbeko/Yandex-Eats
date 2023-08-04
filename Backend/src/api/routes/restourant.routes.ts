import { Router } from "express";
import { _delete, get_all, get_near, get_one, post, update } from "../controllers/restourant.controller";
import isAuth from "../middlewares/isAuth.middleware";
import isRestaurantAdmin from "../middlewares/is-restaurant-admin";

const router = Router();

router.post("/restaurant", isAuth, post);
router.get("/restaurants", isAuth, get_all);
router.get("/restaurant-near", isAuth, get_near);
router.get("/restaurant/:id", isAuth, get_one);
router.put("/restaurant/:id", isRestaurantAdmin, update);
router.delete("/restaurant/:id",isRestaurantAdmin,  _delete);

export default router;