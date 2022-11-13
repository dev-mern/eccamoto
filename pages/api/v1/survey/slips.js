import nextConnector from "next-connect";
import { getSlipsCtl } from "../../../../server/controller/surveyController";

const connectorOption = {
    onerror: (err,req,res,next) =>{
        res.status(500).end("Error occured in server");
    },
    onNoMatch: (req,res) =>{
        res.status(500).end("Page is not found");
    }
}

const handler = nextConnector(connectorOption);

handler.get(getSlipsCtl)

export default handler;