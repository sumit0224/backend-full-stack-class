import express from "express"
import connectToDB from "./config/db.js"
import userRoute from "./routes/userRoutes.js"
import cookiePaser from "cookie-parser"
const app = express()
connectToDB()

app.use(cookiePaser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// apis
app.use("/api/v0", userRoute)

export default app