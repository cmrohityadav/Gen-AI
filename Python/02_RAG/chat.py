# from dotenv import load_dotenv
from langchain_community.embeddings import HuggingFaceEmbeddings # type: ignore
from langchain_qdrant import QdrantVectorStore # type: ignore
from openai import OpenAI # type: ignore

# load_dotenv()

# openai_client = OpenAI()

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"  # fast & small
)

vector_db=QdrantVectorStore.from_existing_collection(
    embedding=embedding_model,
    url="http://localhost:6333",
    collection_name="learning_rag"
)



#take user input
user_query=input("Ask something: ")

# relevant chunks from the vector db
search_results=vector_db.similarity_search(query=user_query)


context = "\n\n\n".join([f"Page Content: {result.page_content}\nPage Number: {result.metadata['page_label']}\nFile Location: {result.metadata['source']}" for result in search_results])


print("Context: ",context)
SYSTEM_PROMPT=f"""
    You are  helpfull AI Assistant who answer user query based
    on the available context retrieved from a PDF file along with page_contents and page number.

    You should only ans the user based on the following context and navigate the user to open the right page number to know more.

    Context:
    {context} 
"""


# response = openai_client.chat.completions.create(
#     model="gpt-5",
#     messages=[
#         { "role": "system", "content":SYSTEM_PROMPT  },
#         { "role": "user", "content":user_query  },
#     ]
# )

# print(f"🤖: {response.choices[0].message.content}")


# using ollama here
import requests
import json

url = "http://localhost:11434/api/chat"

payload = {
    "model": "orieg/gemma3-tools:1b",
    "stream": False,
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": SYSTEM_PROMPT + f"\nUser Question: {user_query}"}
    ]
}

response = requests.post(url, json=payload)
data = response.json()

if "message" in data:
    assistant_message = data["message"]["content"]
    print(f"🤖: {assistant_message}")
else:
    print("⚠️ Unexpected response format:", data)
