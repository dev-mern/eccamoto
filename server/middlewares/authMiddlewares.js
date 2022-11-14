import db from "../db";
import cookie from "cookie";
import {v4 as uuid4,v5 as uuid5} from 'uuid';
import jwt from "jsonwebtoken";
import { checkUserExistService, getUserByEmail } from "../service/authService";
import { comparePasswordHash } from "../utils/passwordBcryptEncrype";
import { envInfo } from "../utils/envInitializer";

const { check, validationResult } = require("express-validator");

const regValidationList = [
    check("name")
      .isLength({ min: 3 })
      .withMessage("The name must have minimum length of 3")
      .trim(),

    check("email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one sepcial character"),

    check("confirm_password").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("confirm password does not match");
      }
      return true;
    }),
]

export function initMiddleware(middleware) {
    return (req, res) =>
      new Promise((resolve, reject) => {
        middleware(req, res, (result) => {
          if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}

export function validateMiddleware(validations, validationResult) {
    return async (req, res, next) => {
      await Promise.all(validations.map((validation) => validation.run(req)))
  
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        return next()
      }
      const formatedErr= {}
      errors.array().forEach(err=>formatedErr[err.param] = err.msg);
      res.status(422).json({data:null, errors: formatedErr, status: false })
    }
}

const regValidateBody = initMiddleware(
    validateMiddleware(regValidationList, validationResult)
)

export const regInfoValidateExpress = async(req,res,next) =>{
    await regValidateBody(req, res)

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
    next()
}


// check if the user is already exist or registered
export const checkExistUser = async(req,res,next) =>{
  try {
    // check for email exist
    await db.connect();
    const isExist = await checkUserExistService({email:req.body?.email});
    await db.disconnect();
    if (isExist) {
      return res.status(409).json({data:null,status:false,errors:{message:"Email already exist"}})
    }
    next()
  } catch (error) {
    console.log(error);
    res.status(500).json({data:null,status:false,errors:{message:"Unknown error occured."}})
  }
}

export const addUserId = async(req,res,next) =>{
  const userId = uuid4();
  await db.connect();
  const isExist = await checkUserExistService({user_id:userId});
  await db.disconnect();
  if (isExist) {
    return res.status(409).json({data:null,status:false,errors:{message:"Internal Server error! Retry Again!"}})
  }
  req.body.user_id = userId;
  next();
}


export const doUserLogin = async(req,res,next) =>{
  try {
    const user = await getUserByEmail(req.body?.email);
    if (user?.user_id) {
      // match the password
      const isValidPassword = await comparePasswordHash(req.body.password,user.password);
      if (isValidPassword) {
        // create jwt token with http only
        const tokenUser = {
          user_id: user.user_id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
        }

         // generate token 
         const token = jwt.sign(tokenUser,envInfo.JWT_SECRET,{expiresIn:envInfo.JWT_EXPIRY})   // expire 7 days: 7*24*60*60*1000
         
         // set cookie
         const cookieOptions = {
            // maxAge: 60 * 60 * 24 * 3, // 3 days  (keep it below JWT expire)
            maxAge: envInfo.COOKIE_EXPIRY, // 3 days  (keep it below JWT expire)
            httpOnly: true,
            signed: true,
            sameSite:"strict",
             secure: process.env.NODE_ENV !== "development",  // allow this only in production
            // secure: false,  // allow this only in production
            // secure: process.env.NODE_ENV === "development" ? false : true,  // check if it is working in production
            path: "/"
          }
         // set the cookie header
         res.setHeader("Set-Cookie",cookie.serialize(envInfo.COOKIE_NAME,token,cookieOptions));
         //  res.status(200).cookie(envInfo.COOKIE_NAME,token,cookieOptions).json(tokenUser)
         res.status(200).json({data:{...tokenUser,token},status:true,message:""})
         

      }else{
        res.status(401).json({data:null,status:false,message:"Email or Password didn't match."});
      }
    }else{
      res.status(401).json({data:null,status:false,message:"Email or Password didn't match."});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({data:null,status:false,message:"Server Error! Try again."});
  }
}

export const keepUserLoggedIn = async(req,res,next) =>{
  // keep the cache for 10 seconds
  res.setHeader('Cache-Control', 's-maxage=86400');
  try {
    // Parse the cookies on the request
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies[envInfo.COOKIE_NAME];
    if (token) {
      const decodedUserInfo = jwt.verify(token,process.env.JWT_SECRET);
      res.status(200).json({data:decodedUserInfo, status:true,message:""})
    }else{
      res.status(401).json({data:{}, status:false,message:"Token is required"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({data:null,status:false,message:"Server Error! Try again."});
  }
}


export const logOutUser = (req,res)=>{
  try {
      const cookies = cookie.parse(req.headers.cookie || '');
      const token = cookies[envInfo.COOKIE_NAME];
      const cookieOptions = {
          maxAge: 1,
          httpOnly: true,
          signed: true,
          sameSite:"strict",
           secure: process.env.NODE !== "development",  // allow this only in production
          // secure: false,  // allow this only in production
          path: "/"
      }
      
      res.setHeader("Set-Cookie",cookie.serialize(envInfo.COOKIE_NAME,"",cookieOptions));
      res.status(200).json({data:null,status:true,message:""})
      
    } catch (error) {
      console.log(error);
      res.status(500).json({data:null,status:true,message:"Something went wrong!"})
  }
}


// check if the user is an admin
export const checkIsAdmin = async(req,res,next) =>{
  try {
    if (req.decodedUser) {
      if (req.decodedUser.role === "admin") {
        req.isAdmin = true;
        next();
      }else{
        res.status(500).json({data:null,status:false,errors:{message:"An admin is allowed to perform this action!"}});
      }
    }else{
      res.status(500).json({data:null,status:false,errors:{message:"User didn't found!"}});
    }
        
  } catch (error) {
    console.log(error);
    res.status(500).json({data:null,status:false,errors:{message:"Unknown error occured."}})
  }
}

// check if the user is login 
export const checkIsLoggedIn = async(req,res,next) =>{
  
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies[envInfo.COOKIE_NAME];
    if (token) {
      const decodedUserInfo = jwt.verify(token,process.env.JWT_SECRET);
      if (decodedUserInfo) {
        // check if the user is really exist in DB
        const existUser = await getUserByEmail(decodedUserInfo.email);
        if (existUser?.user_id) {
          req.decodedUser = decodedUserInfo;
          next();
        }else{
          throw new Error("Invalid authentication.");
        }
      }else{
        throw new Error("Token is not acceptable.");
      }
    }else{
      throw new Error("Token is required.")
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({data:null,status:false,errors:{message: error.message}})
  }
}
