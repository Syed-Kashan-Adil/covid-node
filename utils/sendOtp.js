const client = require('twilio')(process.env.TWILLIO_ACCOUNT_ID, process.env.TWILLIO_AUTH_TOKEN);

export const sendOtp = async (phoneNumber, code) => {
    try {
        const response = await client.messages
            .create({
                body: `This is your verfication code for covid-19 application.\n${code}`,
                from: process.env.SEND_PHONE_NUMBER,
                to: phoneNumber
            })
        console.log(response, "response")
        return response

    } catch (err) {
        console.log(err, "err")
        throw err;
    }

}