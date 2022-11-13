import { getUserCardByIdServeice } from "../service/summaryCardService";

export const summeryCardByUserIdCtl = async(req,res) =>{
    try {
        const {user_id} = req.query;
        const card = await getUserCardByIdServeice(user_id);
        
        if (card?.user_ref) {
            res.status(200).json({data:card,error:false,message:""})
        }else{
            res.status(200).json({data:{},error:false,message:"No user found!"})
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({data:{},error:true,message:"Error occured in server!"})
    }
}