const express = require("express");
const app = express();
const mongoose = require("mongoose");


app.use(express.json());

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/project1")
        console.log("mongodb connected")

    } catch (error) {
        console.log(error, "mongdb connection failed")

    }
}
connectToDB()

//  create user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number
});

//  create user Model 
const userModel = new mongoose.model("user", userSchema);




app.get("/", (req, res) => {
    res.send("porject 1 started")
})
//  API 
app.post("/register", async (req, res) => {
    const { name, email, password, phone } = req.body
    const User = await userModel.create({
        name, email, password, phone
    })
    res.json(User)


})


app.patch("/update", async (req, res) => {
    const { name, email } = req.body
    const updatedUser = await userModel.findOneAndUpdate({ email }, { name: name }, { new: true })
    res.json({ message: "update succesfull", updatedUser })
})

app.get("/profile", async (req, res) => {
    const { email } = req.body
    try {
        const profile = await userModel.find({ email})
        
        if(!profile){
            res.json({
                message: "user not found"
            })
        }

        res.json({message: "here is your profile", profile})

    } catch (error) {
        console.error(error)
    }
})


app.delete("/delete", async(req, res)=>{
    const {email} = req.body
    try {
        const olduser = await userModel.findOneAndDelete({email})
    } catch (error) {
      console.log(error)  
    }

})







const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})




//  "koisabhimodel".create() 