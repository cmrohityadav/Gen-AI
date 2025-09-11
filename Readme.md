# Gen AI
- "Gen AI” stands for Generative Artificial Intelligence
- It’s a type of AI designed to create new content, rather than just analyze or classify existing data
- Generates content – Unlike traditional AI that might only categorize or predict, generative AI produces new, original outputs. For example, it can write an essay, generate a realistic image from a prompt, or compose music

# Difference Between AI and Generative AI

| Feature        | Traditional AI                                    | Generative AI (Gen AI)                                      |
|----------------|--------------------------------------------------|------------------------------------------------------------|
| **Purpose**     | Analyze data, make predictions, classify, detect patterns | Create new content (text, images, music, code, etc.)      |
| **Output**      | Answers, insights, predictions, classifications | Original content that didn’t exist before                 |
| **Example Tasks** | Fraud detection, weather forecasting, recommendation systems | Writing essays, generating art, composing music, coding assistance |
| **Creativity**  | Minimal; follows patterns and rules             | High; “imagines” new content based on learned patterns    |
| **Data Use**    | Learns from data to understand                  | Learns from data to generate                               |
| **Popular Tools** | IBM Watson, traditional ML models             | ChatGPT, DALL·E, MidJourney, GitHub Copilot               |

## In short:

- **AI** = Thinks and analyzes.  
- **Gen AI** = Thinks and creates.

## before LLMs
- Statistical Models ---> Recurring Neural Networks (RNN) ---> Transformer architecture/LLM(self attention)


## Introduction to LLMs
- A Large Language Model (LLM) is an artificial intelligence system trained on huge amounts of text data. It learns patterns of language (grammar, meaning, reasoning, facts) and can generate human-like text, answer questions, summarize, translate, and more.

- Think of it as a super-advanced autocomplete — but instead of finishing your sentence, it can write essays, code, or even carry out reasoning tasks.

```
User prompt ---> LLM ---> Output

```
- **Training data** → The model reads billions of words (books, websites, code, etc.).

- **Neural networks** → It uses a type of AI architecture called a Transformer to learn relationships between words.

- **Prediction** → Given some text (a prompt), it predicts the next most likely word — again and again — to generate coherent responses.


## Models and their capabilities
### GPT vs Reasoning Models

| Aspect              | GPT (Generative Pretrained Transformer)                          | Reasoning Models                                   |
|---------------------|------------------------------------------------------------------|----------------------------------------------------|
| **Core Design**     | Large-scale **language generator** based on next-token prediction | Built for **logical, step-by-step reasoning**      |
| **Training Objective** | Trained on massive text data with **causal LM objective** (predict next word) | Trained/fine-tuned on **reasoning tasks** with supervision or RL |
| **Strengths**       | - Fluency in language <br> - Broad knowledge <br> - Creative writing & summarization | - Handles math, logic, proofs <br> - Produces step-by-step reasoning <br> - Better at structured problem-solving |
| **Weaknesses**      | - Struggles with precise multi-step reasoning <br> - Can "hallucinate" facts | - Less fluent in open-ended text <br> - Narrower domain focus |
| **Examples**        | GPT-3, GPT-4, LLaMA, Mistral                                    | AlphaGeometry, OpenAI o1 (reasoning LLM), Minerva  |
| **Key Difference**  | **General-purpose language model** (great at fluency & knowledge) | **Specialized problem solver** (great at reasoning & logic) |


## Token
- The **smallest unit of text** the model processes , like words or parts of words

## Context
- The surrounding text or information the model uses to understand and generate relevant response
- e.g
1. user input
2. instruction
3. additional information
4. message history

## Context-window
- The **maximum number of tokens an LLM can read and use at thesame tim** to generate or predict text


## Inference
- The process where an LLM take input text and generates an ouput based on what it has learned
- Inference is basically running the trained model to produce results.
```
Train  ---> LLM (learning happens here)
Inference ---> LLM (model is used here, no learning)
```


# Prompt Engineering
- Used to improve the capacity of LLMs on a wide range of common
and complex tasks such as question answering and arithmetic reasoning

## Prompt
A prompt is simply the text you send to a Large Language model
### Structure of prompt
- Instruction
- Input data
- Context
- Output Indicator

#### Structure of a Prompt

1. Instruction → What you want the model to do.

2. Input Data → The content or data the model should work with.

3. Context → Additional background to guide the model.

4. Output Indicator → The format or style of the expected response.


## Zero-shot prompting
- Asking a Large Language Model (LLM) to perform a task without providing any examples of how the task should be done.

- The model relies only on the instruction and its pre-trained knowledge

## Few-shot prompting
- Asking an LLM to perform a task while **providing a few examples of how the task should be done**.

- The model uses both the **provided examples** and **its pre-trained knowledge** to generate a more accurate or contextually appropriate response.


## Chain of Thought prompting
- Asking an LLM to show its reasoning steps when solving a problem, rather than giving only the final answer.

- Especially useful for tasks requiring logic, arithmetic, or multi-step reasoning.

- Example instruction: “Explain your reasoning step by step, then give the final answer.”


# WORKING WITH LLM

## Invokig the LLM
- calling the LLM from our code

## System prompt

example
```javascript
{
            role:'system',
            content:'You are vData , a smart personal assistant'
},

```
## LLM Settings
### Temperature
What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.
- Temperature → jitna zyada, utna random aur creative; jitna kam, utna focused aur predictable

### top_k
An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both.
- Top-p/Top-k → model sirf top probable words se choose karega (kam value = safe, zyada = creative)

### stop 
Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence
- Stop → jis sequence pe rokna hai, wahan output cut ho jayega


### max_completion_tokens
The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.

## Structured output





# RAG
- RAG stands for Retrieval-Augmented Generation
- **Retrieval** → Search for relevant documents from a knowledge base using embeddings + vector database.

- **Augmentation** → Add those documents as context to the user’s query.

- **Generation** → The LLM (Large Language Model) generates an answer using both the query and the retrieved context.

## Naive Retrieval Based Solution Approach
![Naive Retrieval Based Solution](./images/rag_naive_Screenshot%202025-09-01%20211638.png)

##  RAG Pipeline Phases
1. **Indexing Phase** -> Provide the data

![Indexing phase](./images/indexing_phase_Screenshot%202025-09-01%20213311.png)
- This is like preparing your notes before an exam.

- You collect documents (PDFs, web pages, text files, etc.).

- Convert them into embeddings (numerical vectors that capture meaning).

Store those vectors in a vector database (e.g., FAISS, Pinecone).

👉 Why?
So later, when someone asks a question, the system can quickly find the most relevant pieces of info.


📌 Example:
- You upload your science textbook → it gets processed and indexed.

2. **Reterival Phase** ->Chatting with data

![vector searching ](/images//Vector_search_Screenshot%202025-09-01%20225607.png)

![reterival_phase](/images/reterival_phase_Screenshot%202025-09-01%20225805.png)

![Rag Pipeline](/images/whole_rag_Screenshot%202025-09-01%20230113.png)
- This is when a user asks a question.

- The query is also turned into an embedding.

- The system compares it with stored vectors → retrieves the closest matches (relevant passages).

- Those passages are sent along with the user’s question to the LLM (e.g., GPT).

- The LLM generates a final answer using both the retrieved docs + query.

📌 Example:
You ask: “Who discovered gravity?”

- System retrieves passage: “Isaac Newton discovered gravity...”

- AI answers: “Gravity was discovered by Isaac Newton.”



## 📊 Vector Databases Comparison

Vector databases are used in **RAG pipelines** to store and search embeddings efficiently.  
Here’s a comparison of popular options:

---

### 🔹 Open-Source & Free

| Name        | Language / Base  | Key Features | Best For | Notes |
|-------------|-----------------|--------------|----------|-------|
| **FAISS**   | C++ / Python    | Fast similarity search, large-scale, no server required | Research, prototyping | Not a full DB, just a library |
| **Weaviate**| Go              | Hybrid search (vector + keyword), GraphQL API, modules (e.g., transformers) | RAG apps, semantic search | Can run locally or use Weaviate Cloud |
| **Milvus**  | C++ / Go        | Highly scalable, distributed, integrates with Zilliz Cloud | Large datasets, enterprise-scale search | Community edition is free |
| **Qdrant**  | Rust            | High-performance, REST/gRPC API, filtering support | Production-ready search | Lightweight, easy to deploy |
| **Vespa**   | Java / C++      | Handles structured + unstructured data, good for recommendations | Complex search & recommendation engines | Heavier setup |
| **Annoy**   | C++ / Python    | Memory-efficient, approximate nearest neighbor | Simple recommendation tasks | Not as feature-rich as others |
| **Postgres + pgvector** | SQL (Postgres) | Store/search vectors inside Postgres DB | Small/medium projects | Easy if you already use Postgres |
| **ElasticSearch (vector plugin)** | Java | Combines full-text + vector search | Hybrid search | Requires extra setup |

---

### 🔹 Paid / Managed SaaS

| Name                | Based On    | Key Features | Best For | Notes |
|---------------------|-------------|--------------|----------|-------|
| **Pinecone**        | Proprietary | Fully managed, scalable, low-latency, API-first | Production RAG apps | No self-hosted option |
| **Weaviate Cloud**  | Weaviate    | Managed Weaviate instances | Teams who want no DevOps | Pay-as-you-go |
| **Qdrant Cloud**    | Qdrant      | Managed Qdrant clusters | Easy deployment | Auto-scaling |
| **Milvus (Zilliz Cloud)** | Milvus | Managed Milvus | Enterprise-scale apps | Handles billions of vectors |
| **Vespa Cloud**     | Vespa       | Managed Vespa instances | Search + recommender systems | More enterprise-focused |
| **Redis Enterprise (Vector Search)** | Redis | In-memory speed, supports hybrid | Real-time apps | Cloud & paid tiers |
| **AWS OpenSearch / Azure Cognitive Search** | Elastic / Azure | Cloud-native vector search + full-text | Enterprise cloud users | Tied to cloud provider ecosystem |

---

### ✅ Recommendations

- **Learning & Small Projects** → FAISS, Qdrant, pgvector  
- **Hybrid Search (text + vectors)** → Weaviate, ElasticSearch, Redis  
- **Enterprise & Scale** → Pinecone, Milvus (Zilliz Cloud), Vespa  

---



```bash

pip install -qU langchain-community pypdf

pip install -qU langchain-text-splitters

pip install -qU langchain-openai

pip install langchain-qdrant


```

## Tool calling
- Used to interact with external resource such as APIs , database and the web
- Tool calling/function calling



