import jwt from "jsonwebtoken"


const authMiddleware = (req, res , next)=>{
    const token = req.cookies.token
    try {
        if(!token){
            return res.status(401).json({
                success: false,
                message: "unauthorize user"
            })
        }
        const decode = jwt.verify(token, "secretkey")
        req.user = decode        
        next()

    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "auth error"})
    }
}


export default authMiddleware