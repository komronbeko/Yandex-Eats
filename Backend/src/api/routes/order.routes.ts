import { Router } from "express";
import isRestaurantAdmin from "../middlewares/is-restaurant-admin";
import isAuth from "../middlewares/isAuth.middleware";
import {  delete_from_order, orders_in_carts, post_order } from "../controllers/orders.controller";

const router = Router();

router.get("/cart-orders", isAuth, orders_in_carts);
router.post("/order", isAuth, post_order);
router.delete("/order-delete/:id", isAuth, delete_from_order);

export default router;