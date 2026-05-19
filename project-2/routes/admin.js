import express from "express"
import { registerHandler, loginHandler, studentRegisterHandler , teacherRegisterHandler, profileHandler} from "../controllers/adminController.js";
import { auth, isAdmin } from "../middelware/authMiddelware.js";
const router = express.Router();

router.post("/register", registerHandler)
router.post("/login", loginHandler)
router.post("/student/register", auth, isAdmin, studentRegisterHandler)
router.post("/teacher/register", auth, isAdmin, teacherRegisterHandler)
router.get("/profile", auth,  profileHandler)
// router.get("/attendece/student", studentAttendenceHandler)
// router.get("/attendece/teacher", studentAttendenceHandler)




export default router