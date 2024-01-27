import express, { Request, Response } from "express";

import bodyParser from 'body-parser';
import dotenv from "dotenv"
import cors from "cors"
import { sendWhatsMessage } from './services/twilio';



const app = express();
const port = process.env.PORT || 3500;


app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


dotenv.config()

app.post("/chat/send", async (req , res)=>{ 

  const {to,body} = req.body

  try {
    const result = await sendWhatsMessage(`whatsapp:${to}`,body)
    res.status(200).json({success: true, body})
  }catch  (error) { 
    res.status(500).json({success: false,error})
  }
})

app.post('/chat/receive', async   (req , res)=>{ 
  const twilioRequestBody = req.body
  console.log ('BODY TW',twilioRequestBody)
  const messageBody = twilioRequestBody.Body
  const to = twilioRequestBody.From 
  try {
    await sendWhatsMessage(to, messageBody)
    res.status(200).json({success: true, messageBody})
  }catch  (error) { 
    res.status(500).json({success: false,error})
}
})

app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
});
