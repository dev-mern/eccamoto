// status,trans_id,user_id,sub_id,sub_id_2,amount_local,amount_usd,offer_id,hash,ip_click

import { updateSummaryCardService } from "../service/summaryCardService";
import { updateSurveySlipService } from "../service/surveyService";

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

        if (surveyRes.modifiedCount > 0) {
            res.status(200).json({data:surveyRes,error:false,status:"success"})

            // update summary card after sending response to postbackAPI
            const newCardIncDoc = {};
            newCardIncDoc.total_amount = Number(amount_usd * (Number(status) === 2 ? -1 : 1));  // status == 2 ; calcelled, deduct the amount
            // check for type and update
            if (type === 'complete') {
                newCardIncDoc.completed_amount = Number(amount_usd * (Number(status) === 2 ? -1 : 1));
            }else if (type === 'bonus') {
                newCardIncDoc.bonus_amount = Number(amount_usd * (Number(status) === 2 ? -1 : 1));
            }else {
                newCardIncDoc.out_amount = Number(amount_usd * (Number(status) === 2 ? -1 : 1));
            }
            
            if (type !== 'out') {
                const card = await updateSummaryCardService(req.query.user_id,newCardIncDoc);
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

