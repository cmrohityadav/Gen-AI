from fastapi import FastAPI,Query
from .client.rq_client import queue
from .queue.worker import process_query
app=FastAPI()

@app.get("/ping")
def root():
    return {"message":"pong"}

@app.post("/chat")
def chat(query:str =Query(...,description="The chat query of user")):
    job=queue.enqueue(process_query,query)
    return {"status":"queued","job_id":job.id}


def get_result(job_id:str=Query(...,description="Job ID")):
    job=queue.fetch_job(job_id=job_id)
    result=job.return_value()

    return {}