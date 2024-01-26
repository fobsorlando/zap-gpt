import express, { Request, Response } from "express";

import bodyParser from 'body-parser';
import dotenv from "dotenv"
import cors from "cors"
import { sendWhatsMessage } from './services/twilio';



const app = express();
// const port = 3000;Z
const port = process.env.PORT || 3500;


//app.use(bodyParser.urlencoded())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

//const allowedOrigins = ['http://localhost:3500'];

//const options: cors.CorsOptions = {
//  origin: allowedOrigins
//};

//app.use(cors(options));

dotenv.config()

  app.post("/chat/send", async (req , res)=>{ 

  const {to,body} = req.body

  try {
    const result = await sendWhatsMessage(`whatsapp:${to}`,body)
    console.log(result)
    res.status(200).json({success: true, body})
  }catch  (error) { 
    res.status(500).json({success: false,error})
  }
})

app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
});
