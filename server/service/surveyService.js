import db from "../db";
import SurveyModel from "../models_schemas/SurveyModel";


export const updateSurveySlipService = async(surveySlip={}) =>{
    try {
        const {status,trans_id,user_id,subid_1,subid_2,amount_local,amount_usd,offer_id,secure_hash,type,ip_click} = surveySlip;
        const setDoc = {status,trans_id,user_id,subid_1,subid_2,offer_id,secure_hash,type,ip_click};
        const incDoc = {amount_local,amount_usd };
        
        await db.connect();
        // store the slip
        const slip = await SurveyModel.updateOne(
            {
                user_id: surveySlip.user_id,
                trans_id: surveySlip.trans_id,
            },
            {
                $set: setDoc,
                $inc: {
                    amount_local: Number(amount_local * (Number(status) === 2 ? -1:1)),
                    amount_usd: Number(amount_usd * (Number(status) === 2 ? -1:1))
                }
            },
            {
                upsert: true
            },
        )
        
        await db.disconnect();
        return slip;
    } catch (error) {
        console.log(error);
        return error;
    }
}



// get survey slips by query
export const getSurveySlipsService = async(query={}) =>{
    try {
        await db.connect();
        // store the slip
        const slips = await SurveyModel.find(query,{_id:0,__v:0,ip_click:0}).lean();
        await db.disconnect();
        return slips;
    } catch (error) {
        console.log(error);
        return error;
    }
}


