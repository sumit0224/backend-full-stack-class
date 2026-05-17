import express from "express";
const router = express.Router();
import { loginHandler, registerHandler } from "../controller/userController";


router.post("/register", registerHandler)
router.post("/login", loginHandler)




export default  router
