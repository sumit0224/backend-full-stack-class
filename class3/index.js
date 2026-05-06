const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


app.use(express.json());

const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/demo")
        console.log("mongodb connected")
    } catch (error) {
        console.log(Error)
    }
}
connection();


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,

})

const User = new mongoose.model("user", userSchema);

app.post("/register", async(req, res) => {
    const { username, email, password } = req.body;

    try {
        if(!username.trim() || !email.trim() || !password.trim()){
            return res.status(400).json({sucess: false,
                message: "please filled all the fields"
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({sucess: false, message: "user already exists"})

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username: username,
            email: email,
            password : hashPassword
        })

        const token = jwt.sign({id: newUser._id}, "JWT_SECRET" )

        res.status(201).json({
            sucess:true, 
            message: "account created sucessfully",
            token
        })
        

    } catch (error) {
        console.error(error)
        res.status(500).json({sucess: false, message: "server error"})

    }
})


app.post("/login", async(req, res)=>{
    const {email, password} = req.body
    try {
        if(!email.trim()|| !password.trim()) return res.status(400).json({sucess:false, message: "please fill the all fields"})
        const existingUser = await User.findOne({email});
        // if incase data not present in database then run this line becouse of  falsy value convert by !
        if(!existingUser)return res.status(400).json({sucess:false, message:"user not registered"})

        const isMatch = await bcrypt.compare(password, existingUser.password );
        if(!isMatch) return res.status(403).json({sucess: false, message: "invaild email and password"})
        
        const token = jwt.sign({id: existingUser._id}, "JWT_SECRET");

        return res.status(200).json({sucess: true, message: "login sucessfully", token})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({sucess:false, message: "server error"})
    }

})


app.get("/", (req, res) => {
    res.send("api running ")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("server started")
})
