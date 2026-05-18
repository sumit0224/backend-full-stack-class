import userModel from "../models/userModel.js"
import studentModel from "../models/student.js"
import teacherModel from "../models/teacher.js"
import adminModel from "../models/admin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const registerHandler =async (req, res)=>{
    const {fullName, email, password, phone} = req.body
    try {
        if(!fullName|| !email || !password || !phone) return res.status(400).json({success: false, messsage: "fill all the deatils"});

        const existingAdmin = await userModel.findOne({$or: [{email}, {phone}]});

        if(existingAdmin) return res.status(400).json({success: false,messsage: "admin already exists"})
        
        const hashedpassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedpassword,
            phone,
            role: "admin"
        });

        const newAdmin = await adminModel.create({
            userId: newUser._id
        })

        
        const token = jwt.sign({_id : newAdmin._id}, process.env.JWT_SECRET_KEY)

        res.status(201).json({
            success: true,
            messsage: "admin register success",
            newAdmin,
            token
        })




    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            messsage:"server error on admin register"
        })
    }


}
const loginHandler = ()=>{

}
const studentRegisterHandler = ()=>{

}
const teacherRegisterHandler = ()=>{

}

export {registerHandler, loginHandler, studentRegisterHandler, teacherRegisterHandler}