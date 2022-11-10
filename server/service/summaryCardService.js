import db from "../db";
import SummeryCardModel from "../models_schemas/SummeryCard";

export const updateSummaryCardService = async(user_id,incrementDoc={}) =>{
    
    try {
        const {total_amount,completed_amount,bonus_amount,out_amount} = incrementDoc;
        await db.connect();
        // update the Card
        const summaryCardRes = await SummeryCardModel.updateOne(
            {
                user_ref: user_id,
            },
            {
                $set: {user_id},
                $inc: incrementDoc
            },
            {
                upsert: true
            },
        )
        
        await db.disconnect();
        return summaryCardRes;
    } catch (error) {
        console.log(error);
        return error;
    }
}