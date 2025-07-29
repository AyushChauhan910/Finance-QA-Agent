# core/rag_query_system.py
import os
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Load environment variables from .env file
load_dotenv()

# Load Hugging Face token from environment variable
# Set HUGGINGFACEHUB_API_TOKEN in your environment or .env file
if not os.getenv("HUGGINGFACEHUB_API_TOKEN"):
    raise ValueError("HUGGINGFACEHUB_API_TOKEN environment variable is required")

# Load the model and tokenizer
model_name = "google/flan-t5-large"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

def generate_response(query: str, context: list):
    """Generates a response using the RAG pipeline."""
    # Prepare the input for the model
    context_str = " ".join([doc.page_content for doc in context])
    input_text = f"Context: {context_str}\nQuestion: {query}\nAnswer:"
    input_ids = tokenizer(input_text, return_tensors="pt").input_ids

    # Generate the response
    outputs = model.generate(input_ids, max_length=512)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return response

