const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ejs")
        console.log("mongodb connected")

    } catch (error) {
        console.log(error)
    }
}

connectToDB()



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static("public"))

//  user model

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String

}, {
    timestamps: true
}
)
const userModel =  mongoose.model("user", userSchema)

app.get("/", (req, res) => {
    res.render("home", data)

})


app.get("/register", (req, res) => {
    res.render("register", { message: null, success: null, formData: {} })
})

app.get("/login", (req, res) => {
    res.render("login", { message: null, success: null, formData: {} })
})

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (!name || !email || !password) {
            return res.status(400).render("register", {
                message: "Please fill all fields",
                success: false,
                formData: { name, email }
            })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).render("register", {
                message: "User already exists",
                success: false,
                formData: { name, email }
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ _id: newUser._id }, "secretkey")

        return res.status(201).render("register", {
            message: "User registered successfully. You can now login.",
            success: true,
            formData: {}
        })
    } catch (error) {
        console.error(error)
        return res.status(500).render("register", {
            message: "Server error on register",
            success: false,
            formData: { name, email }
        })
    }
})
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      return res.status(400).render("login", {
        success: false,
        message: "Please fill all details",
        formData: {password, email}
      });
    }

    // find user
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).render("login",{
        success: false,
        message: "User does not exist",
        formData: {email,password}
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatch) {
      return res.status(401).render("login", {
        success: false,
        message: "Invalid email or password",
        formData:{email,password}
      });
    }

    // generate token
    const token = jwt.sign(
      { _id: existingUser._id },
      "secretkey"
    );

    



    return res.status(200).render("home",{
      success: true,
      message: "Logged in successfully",
      token,
      user: existingUser
     
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error on login",
    });
  }
})


app.listen(3000, () => {
    console.log("server running on localhost")
})


