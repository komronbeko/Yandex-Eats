import { Router } from "express";
import { login, register, users, verifyUser } from "../controllers/auth.controller";
import { isAuth, isSuperAdmin } from "../middlewares/checkrole.middleware";

const router = Router();

router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/auth/register/verify", verifyUser);
router.get("/users", isSuperAdmin, users);

export default router;
