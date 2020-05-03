import { LocationModel } from "../models/location"
export const deleteLocationData = () => {
    setInterval(async () => {
        const fifteenMinutesOld = new Date()
        fifteenMinutesOld.setMinutes(fifteenMinutesOld.getMinutes() - 5)
        return LocationModel.deleteMany({ createdAt: { $lte: fifteenMinutesOld } })
    }, 900000)
}