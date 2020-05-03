import JWT from "jsonwebtoken";
import { LocationModel } from "../models/location";
import { UserModel } from "../models/user"
const haversine = require('haversine')


const LocationController = {
    addLocation: async (request, response) => {
        try {
            const { latitude, longitude } = request.body;
            const { userId } = request.value.body;
            const user = await UserModel.findOne({ _id: userId });
            if (!user)
                return response.status(400).send({ message: "User not found", status: false })
            const newLocation = await new LocationModel({
                user: userId,
                latitude,
                longitude,
            })
            await newLocation.save();
            if (user.status === 0) {
                const coordinates = await LocationModel.find({}).populate("user", "status")
                for (let value of coordinates) {
                    if (value.user._id !== userId && value.user.status > 0) {
                        const { latitude: lat, longitude: lng } = value;
                        const start = {
                            latitude,
                            longitude,
                        }

                        const end = {
                            latitude: lat,
                            longitude: lng
                        }
                        const meters = haversine(start, end, { unit: 'meter' });
                        console.log(meters);
                        if (meters <= 3) {
                            await UserModel.updateOne({ _id: userId }, { $set: { status: 1 } })
                            break;
                        }

                    }
                }
            }
            return response.status(200).send({ message: "Location has been saved successfully", status: true })

        } catch (err) {
            return response.status(400).send({
                message: err,
                status: false
            })
        }

    },

}


export { LocationController }