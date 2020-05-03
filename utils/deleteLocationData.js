import { LocationModel } from "../models/location"
export const deleteLocationData = () => {
    setInterval(async () => {
        const fifteenMinutesOld = new Date()
        fifteenMinutesOld.setMinutes(fifteenMinutesOld.getMinutes() - 15)
        return LocationModel.deleteMany({ timestamps: { $gte: fifteenMinutesOld } })
    }, 900000)
}