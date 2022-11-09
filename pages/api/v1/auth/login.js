import nextConnector from "next-connect";
import { doUserLogin, keepUserLoggedIn } from "../../../../server/middlewares/authMiddlewares";



const connectorOption = {
    onerror: (err,req,res,next) =>{},
    onNoMatch: (req,res) =>{
        res.status(404).end("Page is not found");
    }
}

// registration middlewares
const handler = nextConnector(connectorOption)
handler.get(keepUserLoggedIn)
        .post(doUserLogin)

export default handler;