from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
import requests

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"  # fast & small
)

vector_db=QdrantVectorStore.from_existing_collection(
    embedding=embedding_model,
    url="http://localhost:6333",
    collection_name="learning_rag"
)


from rq import SimpleWorker, Queue
from redis import Redis
redis_conn = Redis()


queue = Queue(connection=redis_conn)

def process_query(query:str):
    print("Searching chunks",query)
    search_results=vector_db.similarity_search(query=query)

    context = "\n\n\n".join([f"Page Content: {result.page_content}\nPage Number: {result.metadata['page_label']}\nFile Location: {result.metadata['source']}" for result in search_results])
    
    SYSTEM_PROMPT=f"""
    You are  helpfull AI Assistant who answer user query based
    on the available context retrieved from a PDF file along with page_contents and page number.

    You should only ans the user based on the following context and navigate the user to open the right page number to know more.

    Context:
    {context} 
    """
    url = "http://localhost:11434/api/chat"

    payload = {
        "model": "orieg/gemma3-tools:1b",
        "stream": False,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": query}
        ]
    }

    response = requests.post(url, json=payload)
    data = response.json()

    if "message" in data:
        assistant_message = data["message"]["content"]
        print(f"🤖: {assistant_message}")
        return assistant_message
    else:
        print("⚠️ Unexpected response format:", data)




if __name__ == "__main__":
    worker = SimpleWorker([queue], connection=redis_conn)
    worker.work()