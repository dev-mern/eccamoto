// status,trans_id,user_id,sub_id,sub_id_2,amount_local,amount_usd,offer_id,hash,ip_click

import { updateSummaryCardBySubstructService, updateSummaryCardService } from "../service/summaryCardService";
import { getSurveySlipsService, updateSurveySlipService } from "../service/surveyService";

/*
    status  = 1             : plus
    status  = 2             : minus
    type    = out           : no calc
    type    = complete      : plus
    type    = bonus         : plus
    amount_local =          :
    amount_usd  =           :
*/

export const surveyCtl = async(req,res) =>{
    console.log(req.query," => Survey Query Doc Received <=");
    try {
        if (!req.query.trans_id || !req.query.user_id) {
            return res.status(500).json({data:null,status:false,message:"user_id or trans_id is missing!"})
        }
        const surveyRes = await updateSurveySlipService(req.query);

        if (surveyRes.modifiedCount > 0 || surveyRes.upsertedCount > 0) {
            res.status(200).json({data:surveyRes,error:false,status:"success"})
            // update summary card after sending response to postbackAPI
            const {user_id,amount_usd,status,type} = req.query;
            const newCardIncDoc = {};
           
            if (Number(status) === 1) {
                const card = await updateSummaryCardService(user_id,req.query);
            }else{
                const decCard = await updateSummaryCardBySubstructService(user_id,req.query);
            }
            
            // end the response
            res.end();        
        }else{
            console.log(surveyRes,"Failed to update survey slip result");
            res.status(500).json({data:{},error:true,status:"fail"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({data:null,status:false,message:"Something went wrong!"})
    }
}

// get all survey slips
export const getSlipsCtl = async(req,res) =>{
    try {
        const mainQuery = req.query;
        const query = Object.entries(mainQuery).reduce((pre,[k,v])=>( v ? (pre[k] = v, pre) : pre ),{}); // clear empty query fields
        const slips = await getSurveySlipsService(query); 
        res.status(200).json({data:slips,error:false,message:""})
    } catch (error) {
        res.status(500).json({data:null,status:false,message:"Something went wrong!"})
    }
}