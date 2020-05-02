import JWT from "jsonwebtoken";
import { UserModel } from "../models/user";
import { OTPModel } from "../models/otp"

const JWTToken = (userId) => JWT.sign({
    userId,
}, process.env.PRIVATE_KEY)
const UserController = {
    login: async (request, response) => {
        try {
            const { phoneNumber } = request.body;
            await OTPModel.updateMany({ phoneNumber, active: true }, { $set: { active: false } })
            const code = 1111;
            const OTP = new OTPModel({
                phoneNumber,
                code,
                active: true

            })
            await OTP.save();
            return response.status(200).send({ message: "4 digits code successfully send to your number", status: true })
        } catch (err) {
            return response.status(400).send({
                message: err,
                status: false
            })
        }

    },
    verifyOTP: async (request, response) => {
        try {
            const { phoneNumber, code } = request.body;
            const OTP = await OTPModel.findOne({ phoneNumber, code, active: true });
            if (!OTP)
                return response.status(400).send({ message: "OTP not found", status: false })
            await OTPModel.updateOne({ _id: OTP.id }, { $set: { active: false } })
            const User = await UserModel.findOne({ phoneNumber });
            if (!User) {
                const user = await new UserModel({
                    phoneNumber
                });
                await user.save();
                return response.status(200).send({
                    message: "Login Successfully",
                    data: {
                        user,
                        firstTimeLogin: true,
                        token: JWTToken(user._id)
                    },
                    status: true
                })
            }
            return response.status(200).send({
                message: "Login Successfully",
                data: {
                    user: User,
                    firstTimeLogin: false,
                    token: JWTToken(User._id)
                },
                status: true
            })

        } catch (err) {
            return response.status(400).send({
                message: err,
                status: false
            })
        }
    },
    registration: async (request, response) => {
        try {
            const { fullName, address, asAdmin, adminKey } = request.body
            const { value: { body: { userId } } } = request
            const user = await UserModel.findOne({ _id: userId });
            if (!user)
                return response.status(400).send({ message: "User not found", status: false })
            if (asAdmin) {
                if (adminKey !== process.env.ADMIN_KEY) {
                    return response.status(400).send({ message: "Admin key does not match", status: false })
                }
            }
            await UserModel.updateOne({ _id: userId }, { $set: { fullName, address, userRole: asAdmin ? "admin" : "user" } });
            return response.status(200).send({ message: "Registration successfull", status: true })
        } catch (err) {
            return response.status(400).send({
                message: err,
                status: false
            })
        }
    },
    updateCovidStatus: async (request, response) => {
        try {
            const { userId: requestedPersonId } = request.value.body;
            const { userId, status } = request.body
            const requestedPerson = await UserModel.findOne({ _id: requestedPersonId, userRole: "admin" });
            if (!requestedPerson)
                return response.status(400).send({ message: "You do not have admin account", status: false })
            const user = await UserModel.findOne({ _id: userId });
            if (!user)
                return response.status(400).send({ message: "User not found", status: false })
            await UserModel.updateOne({ _id: userId }, { $set: { status } });
            return response.status(200).send({ data: { tempratureRecord }, status: true })
        } catch (err) {
            return response.status(400).send({
                message: err,
                status: false
            })
        }

    },
    getUser: async (request, response) => {
        try {
            const { userId } = request.value.body
            const user = await UserModel.findOne({ _id: userId });
            if (!user)
                return response.status(400).send({ message: "User not found", status: false })
            return response.status(200).send({ data: { user }, status: true })
        } catch (err) {
            return response.status(400).send({
                message: err,
                status: false
            })
        }
    },
    userDetail: async (request, response) => {
        try {
            const { userId } = request.query;
            const user = await UserModel.findOne({ _id: userId });
            if (!user)
                return response.status(400).send({ message: "User not found", status: false })
            return response.status(200).send({ data: { user }, status: true })
        } catch (err) {
            return response.status(400).send({
                message: err,
                status: false
            })
        }
    }




}


export { UserController }