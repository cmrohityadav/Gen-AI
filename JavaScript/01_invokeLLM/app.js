console.log("Welcome to GenAi");
import dotenv from 'dotenv'
dotenv.config();
import Groq from "groq-sdk";

const groq= new Groq({apiKey:process.env.GROQ_API_KEY});

async function main(){
const completion=await groq.chat.completions.create({
    model:'llama-3.3-70b-versatile',
    messages:[
        {
            role:'user',
            content:'Hi'
        },
    ],
})

console.log(`Completion: `,completion);
}

main()