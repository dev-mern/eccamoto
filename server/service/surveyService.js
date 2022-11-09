import db from "../db";
import SurveyModel from "../models_schemas/SurveyModel";

export const updateSurveySlipService = async(surveySlip={}) =>{
    try {
        const {status,trans_id,user_id,subid_1,subid_2,amount_local,amount_usd,offer_id,secure_hash,type,ip_click} = surveySlip;
        const setDoc = {status,trans_id,user_id,subid_1,subid_2,offer_id,secure_hash,type,ip_click};
        const incDoc = {amount_local,amount_usd };
        console.log(amount_local);
        console.log(Number(amount_local));
        await db.connect();
        const slip = await SurveyModel.updateOne(
            {
                user_id: surveySlip.user_id,
                trans_id: surveySlip.trans_id,
            },
            {
                $set: setDoc,
                $inc: {
                    amount_local: Number(amount_local),
                    amount_usd: Number(amount_usd)
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