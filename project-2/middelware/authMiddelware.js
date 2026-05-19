

import jwt from "jsonwebtoken"

const auth = (req, res, next)=>{
    const token = req.cookies.token

   try {
     if(!token){
        return res.status(400).json({success:false, message: "invaild token"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = decoded
    console.log(req.user)
    next()
    
   } catch (error) {
        console.error(error)
        res.status(500).json({success:false, message:"server error"})
   }

}

const isAdmin = (req, res, next)=>{
    const role = req.user.role
    if(role !== "admin"){
        return res.status(403).json({success:false, message : "unauthrized user"})
    }
    next()

}
const publicauth = (req, res, next)=>{
     const token = req.cookies.token

   try {
     if(!token){
        next()
        return res.status(400).json({success:false, message: "public"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = decoded
    console.log(req.user)
    next()
    
   } catch (error) {
        console.error(error)
        res.status(500).json({success:false, message:"server error"})
   }
}


export {auth, isAdmin, publicauth}