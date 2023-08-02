import { Router } from "express";
import { _delete, get_all, restourant_register, update } from "../controllers/restourant.controller";

const router = Router();

router.post("/auth/register/restourant", restourant_register);
router.get("/restourants", get_all);
router.put("/restourant/:id", update);
router.delete("/restourant/:id", _delete);

export default router;