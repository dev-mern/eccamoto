import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
    {
        notice_id:{
            type: Number,
            required: [true, "Notice id must be required"], 
            unique:[true,"Notice id must be unique"],
        },
        title:{
            type: String,
            required: [true, "Notice title is required"], 
            trim: true, 
            minLength: [10, "Notice title must be at least 10 characteres."],
            maxLength: [100, "Notice title is too large. Keep it below 100 characters."],
        },
        date: {
            type: Date,
            required: [true,"Date is required"],
        },
        description: [{
            type: String,
            required: [true, "Notice details is required"], 
            trim: true, 
        }],
        status:{
            type: String,
            enum:{
                values: ['active','in-active'],
                message: "{VALUE} is invalid role. Role must be 'active' or 'in-active'."
            },
            required: [true,"Notice status is required"],
        }
    },
    {
        timestamps: true
    },
)

const NoticeModel = mongoose.models.Notices || mongoose.model("Notices",noticeSchema);

export default NoticeModel;
