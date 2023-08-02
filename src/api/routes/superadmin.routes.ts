import { Router } from "express";
import { addAdmin, admins, couriers, deleteAnyone, editAdmin, users } from "../controllers/superadmin.controller";
import isAdmin from "../middlewares/isAdmin.middleware";
import isAuth from "../middlewares/isAuth.middleware";
import isSuperAdmin from "../middlewares/isSuperAdmin.middleware";

const router = Router();

router.post("/auth/register/admin", isAuth, isSuperAdmin, addAdmin);
router.put("/admin/edit/:id", isAuth, isSuperAdmin, editAdmin);
router.delete("/delete/:id", isAuth, isAdmin, deleteAnyone);
router.get("/users", isAuth, isAdmin, users);
router.get("/admins", isAuth, isSuperAdmin, admins);
router.get("/couriers", isAuth, isAdmin, couriers);

export default router;
