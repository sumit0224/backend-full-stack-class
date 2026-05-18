import dotenv from "dotenv"
dotenv.config()
import express from "express";

import connectToDB from "./config/db.js";
connectToDB()
import adminRoutes from "./routes/admin.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.send("api running")
})

app.use("/api/admin" , adminRoutes)


app.listen(process.env.PORT, ()=>{
    console.log("server running ")
})