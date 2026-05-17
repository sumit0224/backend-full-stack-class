import express from "express"
import connectToDB from "./config/db.js"
import userRoute from "./routes/userRoutes.js"
import cookiePaser from "cookie-parser"
import ejs from "ejs";
import path from "path"

const app = express()
connectToDB()



import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(cookiePaser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"))


// apis
app.use("/api/v0", userRoute)

export default app