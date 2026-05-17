import express from "express";
const app = express();
import connectToDB from "./config/db.js";
connectToDB()
import userRoutes from "./routes/userRoute.js"


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res)=>{
    res.send("api running ")
})

app.use("/api", userRoutes)


app.listen(3001, ()=>{
    console.log("server running ")
})
