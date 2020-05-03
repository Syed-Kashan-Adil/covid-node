import mongoose from "mongoose";

const Schema = mongoose.Schema;
const LocationSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },

}, { timestamps: true }
);


const LocationModel = mongoose.model("Location", LocationSchema);


export { LocationModel }
