import { Router } from "express";
import { get_all_couriers, get_all_users, get_one_user, update } from "../controllers/user.controllers";
import { _delete } from "../controllers/restourant.controller";
import isAuth from "../middlewares/isAuth.middleware";
import isAdmin from "../middlewares/isAdmin.middleware";
import isRestaurantAdmin from "../middlewares/is-restaurant-admin";

const router = Router();

router.get("/users", isAdmin, get_all_users);
router.get("/couriers", isRestaurantAdmin, get_all_couriers);
router.get("/user", isAuth, get_one_user);
router.put("/user", isAuth, update);
router.delete("/user",isAuth,  _delete);

export default router;