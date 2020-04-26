import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    address: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: ""
    },
    userRole: {
        type: String,
        default: "user"
    },
    joinDate: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Number,
        default: 0
    }

}
);


const UserModel = mongoose.model("User", UserSchema);


export { UserModel }
