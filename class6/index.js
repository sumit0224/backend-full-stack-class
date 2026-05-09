const http = require("http");
const express = require("express")
const app = express()

app.use(express.json())

const midleware = (req, res, next)=>{
    if(req.url === "/about"){
        next()
    }
    next()
}

app.get("/", midleware, (req, res, next) => {
    res.send("api from express")
})

app.get("/product/:id" , (req, res)=>{
    const {id} = req.params
    const {pid} = req.query
    res.json({
        myProductId : id,
        pid : pid
    })


})

const server = http.createServer(app)

server.listen(3000, ()=>{
    console.log("server running")
})

// https://www.flipkart.com/noise-icon-2-1-8-display-bluetooth-calling-women-s-edition-ai-voice-assistant-smartwatch/p/itm968c523d99eae?pid=SMWGEH7VNGPYN5NV&lid=LSTSMWGEH7VNGPYN5NVEORYD7&marketplace=FLIPKART&store=ajy%2Fbuh&srno=b_1_2&otracker=browse&fm=organic&iid=en_orBbCOPDkefEzxXGrpu0B-JAte1f1JQFHniQNTN1I1kpucwo6D4YROM-qVI5x_RtPEw-2XG1KBCkGmzfPVeP__UFjCTyOHoHZs-Z5_PS_w0%3D&ppt=browse&ppn=browse&ov_redirect=true