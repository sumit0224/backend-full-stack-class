import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import genPass from "../utils/randomUsernameGenrator.js"

const registerHandler = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        // data vaildiation 
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "plase fill the all details"
            })
        }
        const existingUser = await userModel.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newusername = genPass(name)

        const newUser = await userModel.create({
            name,
            password: hashedPassword,
            email,
            username: newusername,
            phone
        })

        const token = jwt.sign({ _id: newUser._id }, "secretkey")
        res.cookie("token", token)
        return res.status(201).json({
            success: true,
            message: "user register successfully ",
            token
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "server error on register"
        })
    }

}

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    // find user
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // generate token
    const token = jwt.sign(
      { _id: existingUser._id },
      "secretkey"
    );

    // cookie set
    res.cookie("token", token);

    // remove password before sending
    const userData = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      username: existingUser.username,
      phone: existingUser.phone,
    };

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: userData,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error on login",
    });
  }
};

const profileHandler = async(req, res) => {
    const _id = req.user._id;
    try {
      const profile = await userModel.findOne({_id})
      if(!profile){
        return res.status(401).json({success:false, message: "unautharized"})
      }
      res.status(200).json({
        user: profile
      })
    } catch (error) {
      console.error(error);
        res.status(500).json({
            success: false,
            message: "server error on profile"
        })
    }

}

export { registerHandler, loginHandler, profileHandler }