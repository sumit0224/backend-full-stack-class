import express from "express"
import { registerHandler, loginHandler, studentRegisterHandler , teacherRegisterHandler} from "../controllers/adminController.js";
const router = express.Router();

router.post("/register", registerHandler)
router.post("/login", loginHandler)
router.post("/student/register", studentRegisterHandler)
router.post("/teacher/register", teacherRegisterHandler)
// router.get("/attendece/student", studentAttendenceHandler)
// router.get("/attendece/teacher", studentAttendenceHandler)




export default router