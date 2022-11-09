import db from "../db";
import UserModel from "../models_schemas/UserModel"

export const checkUserExistService = async(query={}) =>{
    try {
        await db.connect();
        const result = await UserModel.findOne(query).lean();
        await db.disconnect();
        return result;
    } catch (error) {
        return error;
    }
}
export const addUserService = async(newUser) =>{
    try {
        await db.connect();
        const result =  await UserModel.create(newUser);
        await db.disconnect();
        return result;
    } catch (error) {
        return error;
    }
}
export const getUserByEmail = async(email) =>{
    try {
        await db.connect();
        const result =  await UserModel.findOne({email});
        await db.disconnect();
        return result;
    } catch (error) {
        return error;
    }
}