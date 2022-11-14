import nextConnect from "next-connect";
import { deleteNoticeByIdCtl, updateNoticeByIdCtl } from "../../../../server/controller/noticesController";
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

// allow for admin
// update and delete a notice by notice_id
handler.patch(checkIsLoggedIn,checkIsAdmin,updateNoticeByIdCtl)
        .delete(checkIsLoggedIn,checkIsAdmin,deleteNoticeByIdCtl)

export default handler;

