import express from "express";
const app = express()



app.get("/search", (req, res)=>{

    const {id} = req.query
    res.send("hello search " + "" + id)
})

// http://localhost:3000/
app.listen(3000, ()=>{
    console.log("server run")
})