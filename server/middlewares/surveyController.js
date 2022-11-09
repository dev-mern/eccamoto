// status,trans_id,user_id,sub_id,sub_id_2,amount_local,amount_usd,offer_id,hash,ip_click

import { updateSurveySlipService } from "../service/surveyService";

export const surveyCtl = async(req,res) =>{
    console.log(req.query," => Survey Query Doc Received <=");
    try {
        if (!req.query.trans_id || !req.query.user_id) {
            return res.status(500).json({data:null,status:false,message:"user_id or trans_id is missing!"})
        }
        
        const surveyRes = await updateSurveySlipService(req.query);
        res.status(200).json(surveyRes)

    } catch (error) {
        console.log(error);
        res.status(500).json({data:null,status:false,message:"Something went wrong!"})
    }
}