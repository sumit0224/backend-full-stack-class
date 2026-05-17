import express from "express"

const router = express.Router();

router.get("/get", (req, res)=>{
    res.send("router level middleware")
})


export default router