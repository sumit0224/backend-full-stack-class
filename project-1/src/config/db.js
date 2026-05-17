import mongoose from "mongoose";

let MONGO_URI = "mongodb://localhost:27017/Auth "
const connectToDB = async ()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("mongodb connected")
    } catch (error) {
            console.error("mongodb not connected")
            
    }
}

export default connectToDB