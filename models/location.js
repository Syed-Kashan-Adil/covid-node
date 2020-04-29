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
    createdAt: {
        type: Date,
        default: new Date()
    },
    processed: {
        type: Boolean,
        default: false
    }

}
);


const LocationModel = mongoose.model("Location", LocationSchema);


export { LocationModel }
