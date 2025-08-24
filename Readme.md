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