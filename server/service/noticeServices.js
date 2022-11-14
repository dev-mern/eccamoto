import db from "../db";
import NoticeModel from "../models_schemas/NoticeModel";

// add a notice 
export const addANoticeService = async(notice) =>{
    try {
        await db.connect();
        // store the notice
        const noticeRes = await NoticeModel.create(notice);
        await db.disconnect();
        return noticeRes;
    } catch (error) {
        console.log(error);
        return error;
    }
}


// get notice by query
export const getNoticesService = async(query={}) =>{
    try {
        await db.connect();
        // get the notice
        const notices = await NoticeModel.find(query,{_id:0,__v:0}).sort("-date").lean();
        await db.disconnect();
        return notices;
    } catch (error) {
        console.log(error);
        return error;
    }
}


// update a notice by ID
export const updateNoticeByIdService = async(notice_id,noticeNewData={}) =>{
    try {
        await db.connect();
        // update the notice
        const updateedNotice = await NoticeModel.findOneAndUpdate({notice_id},{$set:noticeNewData},{runValidators:true,new:true, projection:{_id:0,__v:0,createdAt:0,updatedAt:0}});
        await db.disconnect();
        return updateedNotice;
    } catch (error) {
        console.log(error);
        return error;
    }
}


// delete a notice by ID
export const deleteNoticeByIdService = async(notice_id,noticeNewData={}) =>{
    try {
        await db.connect();
        // delete the notice
        const deletedNotice = await NoticeModel.deleteOne({notice_id});
        
        await db.disconnect();
        return deletedNotice;
    } catch (error) {
        console.log(error);
        return error;
    }
}

