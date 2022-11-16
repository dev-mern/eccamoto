import mongoose from "mongoose";
import { userID_limit } from "../utils/envInitializer";

const userSchema = new mongoose.Schema(
    {
        user_id:{
            type: Number,
            required: [true, "Id must be required"], 
            unique:[true,"Id must be unique"],
            minLength: [userID_limit.min, "User's ID is too short"],
            maxLength: [userID_limit.max, "User's ID is too large"],
        },
        name:{
            type: String,
            required: [true, "Please provide your first name"], 
            trim: true, 
            minLength: [3, "Name must be at least 3 characteres."],
            maxLength: [100, "Name is too large."],
        },
        email: {
            type: String,
            required: [true,"Email is required"],
            unique:[true,"Email already exist"],
            trim: true,
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,"Invalid email address"],
            lowercase:true,
        },
        password: {
            type: String,
            required: [true, "Please provide a strong password"], 
            trim: true, 
            minLength: [8, "Password must be at least 8 characteres."],
        },
        role:{
            type: String,
            enum:{
                values: ['user','admin'],
                message: "{VALUE} is invalid role. Role must be 'user' or 'admin'."
            },
            required: [true,"Role is required"],
            default: 'user'
        }
    },
    {
        timestamps: true
    },
)

const UserModel = mongoose.models.Users || mongoose.model("Users",userSchema);

export default UserModel;
