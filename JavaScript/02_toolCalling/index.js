import dotenv from 'dotenv'
dotenv.config();
import Groq from 'groq-sdk'
import {tavily} from "@tavily/core"

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const tvly = tavily({apiKey:process.env.TAVILY_API_KEY});
async function main() {

    const messages=[
            {
                role: 'system',
                content: `You are smart personal assistant who answer the asked question .
                 You have access to following tools:
                 1. webSearch({query}:{query:string}) //Search the latest information and  realtime data on the internet`,
            },
            {
                role: 'user',
                content: 'when was iphone 17 was launched'
            }
        ];

    
    const completion = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages:messages,
        tools: [
            {
                type: 'function',
                function: {
                    name: 'webSearch',
                    description: 'Search the latest information and  realtime data on the internet',
                    parameters: {
                        type: 'object',
                        properties: {
                            query: {
                                type: 'string',
                                description: 'The search query to perform search on'
                            }
                        },
                        required: ["query"]
                    },

                },

            }
        ],
        tool_choice: 'auto'
        
    });

    messages.push(completion.choices[0].message);

    const toolCalls = completion.choices[0].message.tool_calls;



    if (!toolCalls) {
        console.log(`Assistant: ${completion.choices[0].message.content}`);
        return;
    }

    for (const tool of toolCalls) {
        console.log('tool: ', tool);

        const functionName = tool.function.name;
        const functionParams = tool.function.arguments;

        if (functionName == 'webSearch') {
            const toolResult = await webSearch(JSON.parse(functionParams));
            console.log("Tool result: ", toolResult);

            messages.push({
                tool_call_id:tool.id,
                role:'tool',
                name:functionName,
                content:toolResult,
            })
        }
    }



    const completion2 = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages:messages,
        tools: [
            {
                type: 'function',
                function: {
                    name: 'webSearch',
                    description: 'Search the latest information and  realtime data on the internet',
                    parameters: {
                        type: 'object',
                        properties: {
                            query: {
                                type: 'string',
                                description: 'The search query to perform search on'
                            }
                        },
                        required: ["query"]
                    },

                },

            }
        ],
        tool_choice:'auto'
    });

    console.log("Final response : ", JSON.stringify(completion2.choices[0].message, null, 2));



    // console.log("response from LLM: ", JSON.stringify(completion.choices[0].message, null, 2));
    /*
            {
                "role": "assistant",
                "tool_calls": [
                    {
                    "id": "dxyqth1m3",
                    "type": "function",
                    "function": {
                        "name": "webSearch",
                        "arguments": "{\"query\":\"iPhone 16 launch date\"}"      }
                    }
                ]
        }

    */
}

await main();

async function webSearch({ query }) {
    console.log("Calling web search...........");

    const response=await tvly.search(query);

    // return "Iphone was launched on 20 september 2024"

    console.log("searched response: ",response);

    const finalResult=response.results.map((result)=>result.content).join("\n\n");

    return finalResult;
}