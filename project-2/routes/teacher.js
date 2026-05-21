import express from "express"
import {teacherLoginhandler, teacherProfilehandler} from "../controllers/teacherController.js"
import { auth } from "../middelware/authMiddelware.js"

const router  = express.Router()
// http://localhost:4000/api/teacher/login
router.post("/login", teacherLoginhandler)
router.get("/profile", auth, teacherProfilehandler)


export default router