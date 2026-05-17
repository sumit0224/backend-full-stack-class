import express from "express"
import userRoute from "./routes/userRoute.js"
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res)=>{
    res.send("api running ")
})
// methods of http GET < POST < PATCH < DELETE < PUT
const m1 = (req, res, next)=>{
    console.log("hello m1")
    next()

}
// localhost:3000/api/profile
app.use("/api", userRoute )

app.get("/login", m1,  (req, res)=>{
    console.log("hello")
    res.send("kkkk")
})

app.listen(3000, ()=>{
    console.log("server running")
})
