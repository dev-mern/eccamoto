import { addUserService } from "../service/authService";
import { makePasswordHash } from "../utils/passwordBcryptEncrype";
import db from "../db";

export const addAuthController = async(req,res,next) =>{
    try {
        const newUser = {...req.body};
        newUser.password = await makePasswordHash(req.body?.password);
        delete newUser.confirm_password;
        // check user.role === 'user' is must
        if (!newUser.role) {
            const user = await addUserService(newUser);
            if (user._id) {
                // create JWT and sign in user
                next();
            }else{
                const errors =  db.errorFormatterMongoose(user);
                if (errors instanceof Object) {
                    return res.status(500).json({data:null,status:true,errors})
                }
                return res.status(500).json({data:null,status:true,errors:{message:"Server side error. Try again."}})
            }
        }else{
            res.status(200).json({data:null,status:true,errors:{message:"User's role will be given by an Admin"}})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({data:null,status:false,errors:{message:"Failed to add user. Please try again later"}})
        
    }
}
