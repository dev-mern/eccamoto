import db from "../db";
import { addANoticeService, deleteNoticeByIdService, getNoticesService, updateNoticeByIdService } from "../service/noticeServices";
// import { errorFormatterMongoose } from "../utils/errorFormatterMongoose";


const {errorFormatterMongoose} = db;

export const addNoticeCtl = async(req,res,next) =>{
    try {
        const newNotice = await addANoticeService(req.body);
        
        if (newNotice._id) {
            res.status(200).json({data:newNotice,error:false,message:""})
        }else{
            const errorMessages = errorFormatterMongoose (newNotice);
            res.status(500).json({data:{},error:true,message: errorMessages})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({data:null,error:true,message:"Failed to add notice."});
    }
}


// get all notices control by query 
export const getNoticesCtl = async(req,res) =>{
    try {
        const notices = await getNoticesService(req.query);
        
        if (notices instanceof Array) {
            res.status(200).json({data:notices,error:false,message:""})
        }else{
            res.status(500).json({data:[],error:true,message:"Failed to load notices."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({data:[],error:true,message:"Failed to load notices."});
    }
}



// update a notice by id controler
export const updateNoticeByIdCtl = async(req,res) =>{
    try {
        const {notice_id} = req.query;
        if (!notice_id) {
            return res.status(500).json({data:{},error:true,message:"notice id is required"});
        }
        if (!req.body) {
            return res.status(500).json({data:{},error:true,message:"update data is required"});
        }

        const newNoticeData = {...req.body};
        delete newNoticeData.notice_id; 
        const udatedNotices = await updateNoticeByIdService(notice_id,newNoticeData);
        
        if (udatedNotices?.notice_id) {
            res.status(200).json({data:udatedNotices,error:false,message:""})
        }else if(udatedNotices === null){
            res.status(422).json({data:{},error:true,message:"Didn't find the notice to update"})
        }else{
            const errors = errorFormatterMongoose(udatedNotices);
            res.status(500).json({data:{},error:true,message:"Unknown serverside error occured"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({data:{},error:true,message:"Failed to update notices."});
    }
}


// delete a notice by id controler
export const deleteNoticeByIdCtl = async(req,res) =>{
    try {
        const {notice_id} = req.query;
        if (!notice_id) {
            return res.status(500).json({data:{},error:true,message:"notice id is required"});
        }

        const deletedNotices = await deleteNoticeByIdService(notice_id);
        
        if (deletedNotices.acknowledged && deletedNotices.deletedCount > 0) {
            res.status(200).json({data:deletedNotices,error:false,message:""});
        }else if(deletedNotices.acknowledged && deletedNotices.deletedCount === 0){
            res.status(410).json({data:deletedNotices,error:false,message:"Didn't fine the notice to delete"});
        }else{
            res.status(500).json({data:{},error:true,message:"Failed to delete the notice."});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({data:{},error:true,message:"Failed to delete notices."});
    }
}

