import express from "express";
import { studentLoginHandler, studentProfileHandler } from "../controllers/studentController.js";
import { auth } from "../middelware/authMiddelware.js";

const router = express.Router();

router.post("/login", studentLoginHandler)
router.get("/profile", auth, studentProfileHandler)

export default router