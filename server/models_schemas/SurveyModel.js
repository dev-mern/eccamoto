import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
    {
        user_id:{
            type: String,
            required: [true, "User id must be required"], 
            trim: true, 
            minLength: [3, "Name must be at least 3 characteres."],
            maxLength: [100, "Name is too large."],
        },
        trans_id:{
            type: String,
            required: [true, "trans_id is required"], 
            trim: true, 
        },
        status: {
            type: Number,
        },
        subid_1:{
            type: String,
        },
        subid_2:{
            type: String,
        },
        amount_local:{
            type: Number,
        },
        amount_usd:{
            type: Number,
        },
        offer_id:{
            type: String,
        },
        hash:{
            type: String
        },
        ip_click:{
            type: String,
        },
        type:{
            type: String,
            enum: {
                values: ['complete','out','bonus'],
                message: "{VALUE} is not a type. Type must need to be 'complete' or 'out' or 'bonus'"
            },
        },
        
    },
    {
        timestamps: true
    },
)

const SurveyModel = mongoose.models.Surveys || mongoose.model("Surveys",surveySchema);

export default SurveyModel;

