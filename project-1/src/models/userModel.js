import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        fullname: String,
        phone: Number

})

const UserModel = new mongoose.model("user", userSchema)

export default UserModel