import db from "../db";
import SummeryCardModel from "../models_schemas/SummeryCard";

export const updateSummaryCardService = async(user_id,incrementDoc={}) =>{
    const {amount_usd,type} = incrementDoc;
    console.log("incrementing");
    try {
        // const {total_amount,completed_amount,bonus_amount,out_amount} = incrementDoc;
        const incDoc = {total_amount : Number(amount_usd)}
        if (type === 'complete') {
            incDoc.completed_amount = Number(amount_usd)
        }else if (type === 'bonus') {
            incDoc.bonus_amount = Number(amount_usd)
        }else {
            incDoc.out_amount = Number(amount_usd)
        }

        await db.connect();
        // update the Card
        const summaryCardRes = await SummeryCardModel.updateOne(
            {user_ref: user_id},
            {
                // $set: {user_id},
                $inc: incDoc
            },
            {upsert: true},
        )
        
        
        await db.disconnect();
        return summaryCardRes;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// update summary card by decrement total_amount
export const updateSummaryCardBySubstructService = async(user_id,decrementDoc={}) =>{
    let summaryCardRes;
    try {
        const {amount_usd,type} = decrementDoc;
        
        await db.connect();
        // check cad is already exist else update
        const isExistCard = await SummeryCardModel.findOne({user_ref:user_id});
        if (!isExistCard?.user_ref) {
            const newDoc = {
                total_amount: 0,
                completed_amount: 0,
                bonus_amount: 0,
                out_amount: 0,
            }
            summaryCardRes = await SummeryCardModel.updateOne({user_ref: user_id},newDoc,{upsert:true})
        }else{
            // subtract the amount
            const setDoc = {total_amount : {$max: [0,{$subtract:["$total_amount",Number(amount_usd)]}]}}
            if (type === 'complete') {
                setDoc.completed_amount = {$max: [0,{$subtract:['$completed_amount',Number(amount_usd)]}]}
            }else if (type === 'bonus') {
                setDoc.bonus_amount = {$max: [0,{$subtract:['$bonus_amount',Number(amount_usd)]}]}
            }else {
                setDoc.out_amount = {$max: [0,{$subtract:["$out_amount",Number(amount_usd)]}]}
            }
            // update the Card
            summaryCardRes = await SummeryCardModel.updateOne(
                {user_ref: user_id,},
                [{$set: setDoc}],
                {upsert: true, multi: true},
            )

        }
        
        
        await db.disconnect();
        return {summaryCardRes};
    } catch (error) {
        console.log(error);
        return error;
    }
}

/*
// decrement 
    [{
        $set:{
            total_amount:{
                $max:[0,{$subtract:[$total_amount,newAmount]}]
            }
        }
    }],
    {
        multi: true
    }
*/


// get summary card by uer id 
export const getUserCardByIdServeice = async(user_id) =>{
    try {
        await db.connect();
        const card =  await SummeryCardModel.findOne({user_ref:user_id}).lean();
        await db.disconnect();
        return card;
    } catch (error) {
        console.log(error);
        return error;
    }
}