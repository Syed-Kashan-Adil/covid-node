import mongoose from "mongoose";

const Schema = mongoose.Schema;
const OTPSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

}
);


const OTPModel = mongoose.model("OTP", OTPSchema);


export { OTPModel }
