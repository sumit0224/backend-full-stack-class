import user from "../models/userModel"
const registerHandler = async(req, res)=>{

    const {name, email, password} = req.body
    try {
        if(!name|| !email|| !password){
            return res.status(400).json({success: false, message : "please fill the all details"})
        };
        const existingUser = await user.findOne({email});
        if(existingUser){
            
        }

    } catch (error) {
        
    }


}


const loginHandler = async(req, res)=>{

}



export {registerHandler, loginHandler}