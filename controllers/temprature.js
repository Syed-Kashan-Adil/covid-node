import JWT from "jsonwebtoken";
import { UserModel } from "../models/user";
import { TempratureModel } from "../models/temprature"


const TempratureController = {
    addTemprature: async (request, response) => {
        try {
            const { temprature } = request.body;
            const { userId } = request.value.body;
            const user = UserModel.findOne({ _id: userId });
            if (!user)
                return response.status(400).send({ message: "User not found", status: false })
            const newTemprature = await new TempratureModel({
                userId,
                temprature
            })
            await newTemprature.save();
            return request.status(200).send({ message: "Temprature has been saved successfully", status: true })

        } catch (err) {
            return response.status(400).send({
                message: err,
                status: false
            })
        }


    },
    getTempratureRecord: async (request, response) => {
        try {
            const { userId: requestedPersonId } = request.value.body;
            const requestedPerson = await UserModel.findOne({ _id: requestedPersonId, userRole: "admin" });
            if (!requestedPerson)
                return response.status(400).send({ message: "You do not have admin account", status: false })
            const { userId } = request.query;
            const user = await UserModel.findOne({ _id: userId });
            if (!user)
                return response.status(400).send({ message: "User not found", status: false })
            const tempratureRecord = await TempratureModel.find({ userId });
            return response.status(200).send({ data: { tempratureRecord }, status: true })
        } catch (err) {
            return response.status(400).send({
                message: err,
                status: false
            })
        }

    }

}


export { TempratureController }