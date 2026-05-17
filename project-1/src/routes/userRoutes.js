import express from "express";
import { registerHandler, loginHandler, profileHandler } from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerHandler)
router.post("/login", loginHandler)
router.get("/profile", authMiddleware,  profileHandler)
router.get("/register", (req, res)=>{
    res.render("register")
})

export default router