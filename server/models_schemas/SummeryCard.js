import mongoose from "mongoose";

const summerySchema = new mongoose.Schema(
    {
        user_info:{
            ref: "Users",
            required: [true, "User reference must be required"], 
        },
        total_amount:{
            type: Number,
            required: [true, "User id must be required"], 
        },
        survey:{
            type:{
                completed:{
                    type:Number,
                    default: 0,
                    min: [0,"Survey completed number can't be negative"]
                },
                in_completed:{
                    type:Number
                    default: 0,
                    min: [0,"Survey in-completed number can't be negative"]
                }
            },
            required: [true,"Survey information is required"]
        }
    },
    {
        timestamps: true
    },
)

const SummeryCardModel = mongoose.models.Summerycard || mongoose.model("Summerycard",summerySchema);

export default SummeryCardModel;

