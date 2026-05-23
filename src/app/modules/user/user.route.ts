import express from "express";
import { UserControllers } from "./user.controller.js";

const router = express.Router();

// POST -> /api/v1/users/signup
router.post("/signup", UserControllers.registerUser);

export const UserRoutes = router;