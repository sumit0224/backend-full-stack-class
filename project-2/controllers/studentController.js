import userModel from "../models/userModel.js"
import studentModel from "../models/student.js"
import teacherModel from "../models/teacher.js"
import adminModel from "../models/admin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const studentLoginHandler = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, messsage: "all fields are required" })
        }

        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ success: false, messsage: "user not exists" })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)

        if (!isMatch) {
            return res.status(403).json({ success: false, messsage: "invaild email and password" })
        }

        const token = jwt.sign({ _id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET_KEY)
        res.cookie("token", token)
        res.status(200).json({
            success: true,
            messsage: "login successful",
            token
        })



    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, messsage: "server error on login" })
    }
}

const studentProfileHandler = async (req, res) => {
    
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

export { studentLoginHandler, studentProfileHandler }