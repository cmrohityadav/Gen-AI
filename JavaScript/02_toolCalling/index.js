import Groq from 'groq-sdk'
import dotenv from 'dotenv'
dotenv.config();

const client=new Groq({apiKey:process.env.GROQ_API_KEY});

async function main() {
    const completion=await client.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        temperature:0,
        messages:[
            {
                role:'system',
                content:`You are smart personal assistant who answer the asked question .
                 You have access to following tools:
                 1. webSearch({query}:{query:string}) //Search the latest information and  realtime data on the internet`,
            },
            {
                role:'user',
                content:'when was iphone 16 was launched'
            }
        ],
        tools:[
            {
                type:'function',
                function:{
                    name:'webSearch',
                    description:'Search the latest information and  realtime data on the internet',
                    parameters:{
                        type:'object',
                        properties:{
                            query:{
                                type:'string',
                                description:'The search query to perform search on'
                            }
                        },
                    required:["query"]
                    },
                    
                },

            }
        ],
        tool_choice:'auto'
    });

    console.log("response from LLM: ",JSON.stringify(completion.choices[0].message,null,2));

    if (completion.choices[0].message.tool_calls) {
        console.log("Tool call:", completion.choices[0].message.tool_calls);
    }
}

await main();

async function webSearch({query}) {
    

    return "Iphone was launched on 20 september 2024"
}