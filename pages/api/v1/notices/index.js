import nextConnect from "next-connect";
import { addNoticeCtl, getNoticesCtl, updateNoticeByIdCtl } from "../../../../server/controller/noticesController";
import { checkIsAdmin, checkIsLoggedIn } from "../../../../server/middlewares/authMiddlewares";

const connectorOption = {
    onerror: () =>(err,req,res,next) =>{
        console.log(err);
        res.status(500).end("Error occured in server");
    },
    onNoMatch: ()=>(req,res)=>{
        res.status(404).end("Page is not found");
    }
}

const handler = nextConnect(connectorOption);

handler.get(getNoticesCtl)
        // allow for admin
        // add a new notice
        .post(checkIsLoggedIn,checkIsAdmin,addNoticeCtl)

export default handler;