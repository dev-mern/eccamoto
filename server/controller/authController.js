import { addUserService } from "../service/authService";
import { makePasswordHash } from "../utils/passwordBcryptEncrype";

export const addAuthController = async(req,res,next) =>{
    try {
        const newUser = {...req.body};
        newUser.password = await makePasswordHash(req.body?.password);
        delete newUser.confirm_password;
        const user = await addUserService(newUser);
        if (user._id) {
            // create JWT and sign in user
            next();
        }else{
            res.status(200).json({data:null,status:true,errors:{message:"Server side error. Try again."}})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({data:null,status:false,errors:{message:"Failed to add user. Please try again later"}})
        
    }
}
