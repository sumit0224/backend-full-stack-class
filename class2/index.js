const express = require("express");
const app = express();
const connectToDB = require("./config/db.js")
connectToDB()


app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.send("api running")
})

app.listen(3000, () => {
    console.log("server running ")
})