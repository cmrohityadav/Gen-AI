from fastapi import FastAPI , Body
from ollama import Client


app = FastAPI()

client =Client(
    host='http://localhost:11434',
)


@app.get("/")
def read_root():
    return {"hello":"world"}

@app.get("/contact")
def read_root():
    return {"email":"rohit@rohit.com"}

@app.post("/chat")
def chat(message:str=Body(...,description="The message")):
    response=client.chat(
        model="orieg/gemma3-tools:1b",
        messages=[
        {"role":"user","content":message}
        ]
    )
    return {"response":response.message.content}