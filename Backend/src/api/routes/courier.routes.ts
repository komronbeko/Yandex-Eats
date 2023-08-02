import { Router } from "express";
import { _delete, get_all, post, update } from "../controllers/courier.controller";

const router = Router();

router.post("/courier", post);
router.get("/couriers", get_all);
router.put("/courier/:id", update);
router.delete("/courier/:id", _delete);

export default router;