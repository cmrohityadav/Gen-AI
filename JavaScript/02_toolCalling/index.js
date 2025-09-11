import Groq from 'groq-sdk'

const client=new Groq({apiKey:process.env.GROQ_API_KEY});

async function main() {
    const completion=await client.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        temperature:0,
        messages:[
            {
                role:'system',
                content:'You are smart personal assistant who answer the asked question'
            },
            {
                role:'user',
                content:'when was iphone 16 was launched'
            }
        ]
    });

    console.log("response from LLM: ",completion)
}