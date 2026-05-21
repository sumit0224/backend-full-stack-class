import userModel from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const teacherLoginhandler = async(req, res)=>{
    const { email, password} = req.body 
    try {
        if(!email || !password){
            return res.status(400).json({success: false, message: "fill all the details"})
        }
        const existingTeacher = await userModel.findOne({email});
        if(!existingTeacher){
            return res.status(400).json({success: false, message: "user not found"})
        }
        
        const isMatch = await bcrypt.compare(password, existingTeacher.password)

        if(!isMatch){
            return res.status(403).json({success: false, message: "invaild email and password"})
        }

        const token = jwt.sign({_id: existingTeacher._id, role:existingTeacher.role}, process.env.JWT_SECRET_KEY)

        res.cookie("token", token)

        return res.status(200).json({success: true, message: "login success full"})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({success:false, message: "server error on teacher login"})
        
    }


}

const teacherProfilehandler =async(req, res)=>{
    const _id = req.user._id
        try {
            const user = await userModel.findById({ _id })
            if (!user) {
                return res.status(400).json({ success: false, messsage: "user not exists" })
            }
            const userdata = {
                name: user.fullName,
                email: user.email
            }
            res.status(200).json({ success: true, messsage: "profile found success", userdata })
    
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, messsage: "server error on profile" })
    
        }
    

}



export {teacherLoginhandler, teacherProfilehandler }


