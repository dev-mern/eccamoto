import nextConnect from "next-connect";
import { summeryCardByUserIdCtl } from "../../../../server/controller/summaryCardController";

const connectorOption = {
    onerror:(err,req,res,next)=>{
        res.status(500).end("Error occured in server");
    },
    onNoMatch:(req,res)=>{
        res.status(404).end("Page is not found");
    }
}

const handler = nextConnect(connectorOption);

handler.get(summeryCardByUserIdCtl)

export default handler;