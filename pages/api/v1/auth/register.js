import nextConnector from "next-connect";
import cookieParser from "cookie-parser";
import { addAuthController } from "../../../../server/controller/authController";
import { regInfoValidate, regInfoValidateExpress, checkExistUser, addUserId, doUserLogin } from "../../../../server/middlewares/authMiddlewares";
import { envInfo } from "../../../../server/utils/envInitializer";



const connectorOption = {
    onerror: (err,req,res,next) =>{},
    onNoMatch: (req,res) =>{
        res.status(404).end("Page is not found");
    }
}

// registration middlewares
const handler = nextConnector(connectorOption)
// handler.use(cookieParser(`${envInfo.COOKIE_SIGN_SECRET}`))
handler.post(regInfoValidateExpress,checkExistUser,addUserId,addAuthController,doUserLogin)

export default handler;