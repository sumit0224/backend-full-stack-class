import express from "express"
import { registerHandler, loginHandler, studentRegisterHandler , teacherRegisterHandler, profileHandler, GetAllStudentHandler, GetAllTeacherHandler, noticeHandler, noticeDeleteHandler} from "../controllers/adminController.js";
import { auth, isAdmin } from "../middelware/authMiddelware.js";
const router = express.Router();

router.post("/register", registerHandler)
router.post("/login", loginHandler)
router.post("/student/register", auth, isAdmin, studentRegisterHandler)
router.post("/teacher/register", auth, isAdmin, teacherRegisterHandler)
router.get("/profile", auth,  profileHandler)
router.get("/allstudent", auth, isAdmin  , GetAllStudentHandler)
router.get("/allteacher", auth, isAdmin  , GetAllTeacherHandler)
router.post("/notice", auth, isAdmin  , noticeHandler)
router.delete("/notice/:id", auth, isAdmin  , noticeDeleteHandler)
// router.get("/attendece/student", studentAttendenceHandler)
// router.get("/attendece/teacher", studentAttendenceHandler)




export default router