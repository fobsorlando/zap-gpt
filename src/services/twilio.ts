import twilio from "twilio"
import dotenv from "dotenv"

dotenv.config()

const SID = process.env.TWILIO_ACOUNT_SID
const TOKEN =process.env.TWILIO_AUTH_TOKEN
const PHONE = process.env.PHONE

const client = twilio(SID,TOKEN)

             
export const sendWhatsMessage = async (to: string, body: string ): Promise<void> => {
    console.log(to)
    try {
        await client.messages.create ({
            to: to,
            from: PHONE,
            body: body
        })
        .then(message => console.log(message.sid));

    }catch (error) {
        console.error(`Error seding message to: %{to}: ${error}`)
    }
}


