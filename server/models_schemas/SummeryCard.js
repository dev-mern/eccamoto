import mongoose from "mongoose";

const summerySchema = new mongoose.Schema(
    {
        user_ref:{
            type: String,
            ref: "Users",
            required: [true, "User reference must be required"], 
        },
        total_amount:{
            type: Number,
            required: [true, "User id must be required"], 
            min: [0, "Total amount can not be negative"]
        },
        completed_amount:{
            type:Number,
            default: 0,
            min: [0, "Complete amount can not be negative"]
        },
        bonus_amount:{
            type:Number,
            default: 0,
            min: [0, "Bonus amount can not be negative"]
        },
        out_amount:{
            type:Number,
            default: 0,
            min: [0, "Out amount can not be negative"]
        }

    },
    {
        timestamps: true
    },
)

const SummeryCardModel = mongoose.models.Summerycard || mongoose.model("Summerycard",summerySchema);

export default SummeryCardModel;

