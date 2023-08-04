import { Router } from "express";
import isRestaurantAdmin from "../middlewares/is-restaurant-admin";
import isAuth from "../middlewares/isAuth.middleware";
import {  delete_from_order, order_ready, orders_in_carts, paid_orders, post_order } from "../controllers/orders.controller";
import isCourier from "../middlewares/is-courier.middleware";

const router = Router();

router.get("/cart-orders", isAuth, orders_in_carts);
router.get("/paid-orders", isRestaurantAdmin, paid_orders);
router.get("/ready-orders", isCourier, )
router.put("/order-ready", isRestaurantAdmin, order_ready);
router.post("/order", isAuth, post_order);
router.delete("/order-delete/:id", isAuth, delete_from_order);

export default router;