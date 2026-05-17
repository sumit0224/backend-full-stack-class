import mongoose from "mongoose";


const connectToDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/RBAC")
        console.log("mongodb conected ")
    } catch (error) {
        console.log("mongodb disconnected ")
    }
}

export default connectToDB