import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TempratureSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    temprature: {
        type: Number,
        required: true
    },


}, { timestamps: { createdAt: "created_at" } }
);


const TempratureModel = mongoose.model("Temprature", TempratureSchema);


export { TempratureModel }
