import { Router } from "express";
import { _delete, get_all, post, update } from "../controllers/food.controller";

const router = Router();

router.post("/food", post);
router.get("/foods", get_all);
router.put("/food/:id", update);
router.delete("/food/:id", _delete);

export default router;