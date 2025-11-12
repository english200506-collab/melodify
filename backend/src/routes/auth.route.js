import { Router } from "express";
import {register, login, updateProfile} from "../controller/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put('/profile', protectRoute, updateProfile);

export default router;
