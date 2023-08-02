import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth.controller";

const router = Router();

router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/auth/register/verify", verifyUser);

export default router;
