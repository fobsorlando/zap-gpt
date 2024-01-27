//import {Configuration, OpenAIApi} from 'openai'
// const { Configuration, OpenAIApi } = require("openai");

import Configuration from 'openai'
import dotenv from 'dotenv'
import OpenAI from 'openai';


dotenv.config()

const config = new Configuration ({
    baseURL:'https://api.openai.com/v1/engines/content-filter-alpha-c4/completions',
    organization: 'Fobs',
    timeout:1,
    httpAgent:'www',
    apiKey: process.env.OPENAI_API_KEY
})


//import { OpenAIApi } from 'openai';
//import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  

//const openai = new OpenAI({
//    apiKey: process.env.OPENIA_API_KEY
//});

//const openai = new OpenAI(config)

export const getOpenAICompletion = async (input: string): Promise<string> => {
    try {
        //const completion = await openai.createChatCompletion ({    -- antigo
        const completion = await openai.chat.completions.create({ // -- novo
            model:"gpt-3.5-turbo",
            messages: [{role: "user", content: input}]
        })
        return completion.choices[0].message?.content as string
    }catch(error) {
        console.log ('Error ',error)
        return ''

    }
}


