import { Router } from "express";
import { convert } from "../controllers/payment.controller";

const router = Router();

router.post("/payment", convert);

export default router;