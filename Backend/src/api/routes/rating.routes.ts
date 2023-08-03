import { Router } from "express";
import { get_all, post } from "../controllers/rating.controller";
import isAuth from "../middlewares/isAuth.middleware";

const router = Router();

router.get("/ratings", get_all);
router.post("/rating", isAuth, post);

export default router;