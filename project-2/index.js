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

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("api running")
})

app.use("/api/admin" , adminRoutes)
app.use("/api/student" , studentRoutes)

app.get("/:id", auth, async(req, res)=>{
    const _id = req.user._id 
    const reqesutId = req.params.id


    try {
        const user = await userModel.findById({_id})
        if(_id === reqesutId ){
            res.status(200).json({sucess:true, message: "edit your profile ", user})   
        }
        let publicUser = user.fullName
        res.status(200).json({sucess:true, message: "only profile visit", publicUser})

        
    } catch (error) {
        console.log(error)
    }
})


app.listen(process.env.PORT, ()=>{
    console.log("server running ")
})