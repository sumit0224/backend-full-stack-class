import express from "express";
import { studentLoginHandler, studentProfileHandler } from "../controllers/studentController.js";
import { auth, publicauth  } from "../middelware/authMiddelware.js";

const router = express.Router();

router.post("/login", studentLoginHandler)
router.get("/profile", publicauth, studentProfileHandler)

export default router