const express = require("express");
const app = express();

app.use(express.json());


app.get("/login", (req, res)=> {
    console.log(req.query)
    res.json({message: "api running"})
})



app.listen(3000, ()=>{
    console.log("server running")
})