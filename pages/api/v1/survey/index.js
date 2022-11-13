import nextConnector from 'next-connect';
import { surveyCtl } from '../../../../server/controller/surveyController';

const connectorOption = {
    onerror: (err,req,res,next) =>{
        console.log(err);
        res.status(500).end("Error occured in server");
    },
    onNoMatch: (req,res)=>{
        res.status(404).end("Page is not found");
    }
}

const handler = nextConnector(connectorOption);


// receive params /survey/?status={status}&trans_id={trans_id}&user_id={user_id}&sub_id={subid}&sub_id_2={subid_2}&amount_local={amount_local}&amount_usd={amount_usd}&offer_id={offer_ID}&hash={secure_hash}&ip_click={ip_click}
handler.get(surveyCtl)

export default handler;
