console.log("Welcome to GenAi");
import dotenv from 'dotenv'
dotenv.config();
import Groq from "groq-sdk";

const groq= new Groq({apiKey:process.env.GROQ_API_KEY});

async function main(){
const completion=await groq.chat.completions.create({
    model:'llama-3.3-70b-versatile',
    temperature:1,
    top_p:0.2,
    stop:'',
    max_completion_tokens:'',
    messages:[
        {
            role:'system',
            content:'You are vData , a smart personal assistant'
        },
        {
            role:'user',
            content:'Hi'
        },
    ],
})

console.log(`Completion: `,completion);
}

main()