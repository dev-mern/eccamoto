import nextConnector from "next-connect";
import cookie from "cookie";
import {logOutUser } from "../../../../server/middlewares/authMiddlewares";
import { envInfo } from "../../../../server/utils/envInitializer";



const connectorOption = {
    onerror: (err,req,res,next) =>{},
    onNoMatch: (req,res) =>{
        res.status(404).end("Page is not found");
    }
}

// registration middlewares
const handler = nextConnector(connectorOption)
handler.get(logOutUser)

export default handler;