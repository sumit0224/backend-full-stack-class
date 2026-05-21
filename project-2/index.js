import dotenv from "dotenv"
dotenv.config()
import express from "express";
import connectToDB from "./config/db.js";
connectToDB()
import adminRoutes from "./routes/admin.js"
import cookieParser from "cookie-parser";
import studentRoutes from "./routes/student.js"
import { auth } from "./middelware/authMiddelware.js";
import userModel from "./models/userModel.js";
import teacherRoutes from "./routes/teacher.js"
import noticeModel from "./models/notice.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("api running")
})

app.use("/api/admin" , adminRoutes)
app.use("/api/student" , studentRoutes)
app.use("/api/teacher" , teacherRoutes)

app.get("/notice",async (req, res)=> {
    try {
        const notice = await noticeModel.find();
        res.status(200).json({success:true, message: "get all notice",notice})
        
    } catch (error) {
        
    }
     
})


app.listen(process.env.PORT, ()=>{
    console.log("server running ")
})