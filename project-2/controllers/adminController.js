import userModel from "../models/userModel.js"
import studentModel from "../models/student.js"
import teacherModel from "../models/teacher.js"
import adminModel from "../models/admin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import studentPassword from "../utils/studentPassword.js"
import noticeModel from "../models/notice.js"


const registerHandler = async (req, res) => {
    const { fullName, email, password, phone } = req.body
    try {
        if (!fullName || !email || !password || !phone) return res.status(400).json({ success: false, messsage: "fill all the deatils" });

        const existingAdmin = await userModel.findOne({ $or: [{ email }, { phone }] });

        if (existingAdmin) return res.status(400).json({ success: false, messsage: "admin already exists" })

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


        const token = jwt.sign({ _id: newAdmin._id , role: newAdmin.role}, process.env.JWT_SECRET_KEY)

        res.status(201).json({
            success: true,
            messsage: "admin register success",
            newAdmin,
            token
        })




    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            messsage: "server error on admin register"
        })
    }


}
const loginHandler = async (req, res) => {
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
const studentRegisterHandler = async (req, res) => {

    const {fullName, email, course, batch, fees , phone} = req.body

    try {
        if(!fullName|| !email || !course|| !batch || !fees || !phone){
            return res.status(400).json({success:false, messsage: "fill all details"})
        }
        
       const existingStudent = await userModel.findOne({ $or: [{ email }, { phone }] });

        if (existingStudent) return res.status(400).json({ success: false, messsage: "student already exists" })

        const password = studentPassword(fullName)

        const hashedpassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedpassword,
            phone,
            
        });
        const newStudent = await studentModel.create({
            userId : newUser._id,
            course,
            batch,
            fees
        })
        const token = jwt.sign({_id: newUser._id, role: newUser.role}, process.env.JWT_SECRET_KEY)

        let studentidpass = {
            email : email, 
            password: password
        }
        res.status(201).json({
            success:true,
            messsage: "student register successful",
            studentidpass
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, messsage: "server error on student register failed" })
        
    }

}
const teacherRegisterHandler = async (req, res) => {
    try {

        const {
            fullName,
            email,
            phone,
            subject,
            salary,
            experience
        } = req.body;

        // Validation
        if (
            !fullName ||
            !email ||
            !phone ||
            !subject ||
            !salary ||
            !experience
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details"
            });
        }

        // Check existing teacher
        const existingTeacher = await userModel.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingTeacher) {
            return res.status(400).json({
                success: false,
                message: "Teacher already exists"
            });
        }

        // Generate password
        const password = studentPassword(fullName);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
            phone,
            role: "teacher"
        });

        // Create teacher profile
        const newTeacher = await teacherModel.create({
            userId: newUser._id,
            salary,
            experience,
            subject
        });

        // Generate JWT token
        const token = jwt.sign(
            {
                _id: newUser._id,
                role: newUser.role
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        // Response
        return res.status(201).json({
            success: true,
            message: "Teacher registered successfully",
            token,
            teacherCredentials: {
                email,
                password
            },
            teacher: newTeacher
        });

    } catch (error) {

        console.log("Teacher Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
const profileHandler = async (req, res) => {
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

const GetAllStudentHandler = async(req, res)=>{

    const {role} = req.body

    try {
        if(role !== "student" ){
            return res.status(400).json({success:false, message: "only student role "})
        }
        const allUser = await userModel.find({role})

        res.status(200).json({success:true, message:"all student found", allUser})
        
    } catch (error) {
        console.log(error)
        res.status(500)
    }



}

const GetAllTeacherHandler = async(req, res)=>{

    const {role} = req.body

    try {
        if(role !== "teacher" ){
            return res.status(400).json({success:false, message: "only student role "})
        }
        const allUser = await userModel.find({role})

        res.status(200).json({success:true, message:"all student found", allUser})
        
    } catch (error) {
        console.log(error)
        res.status(500)
    }



}


const noticeHandler = async(req, res)=>{
    const {title, description, date} = req.body

    try {
        if(!title || !description || !date){
            return res.status(400).json({success: false, message: "fill all the details"})

        }
        const notice = await noticeModel.create({
            title,
            description,
            date
        })

        res.status(201).json({success:true, message: "notice created successfull", notice})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: "server error on noitce "})
    }


}
const noticeDeleteHandler = async(req, res)=>{
        const _id = req.params.id
        const deleteData = await noticeModel.findByIdAndDelete({_id})
        res.status(200).json({success:true, message: "notice delete success full"})
}   

export { registerHandler, loginHandler, studentRegisterHandler, teacherRegisterHandler, profileHandler, GetAllStudentHandler,noticeHandler, GetAllTeacherHandler, 
    noticeDeleteHandler
 }