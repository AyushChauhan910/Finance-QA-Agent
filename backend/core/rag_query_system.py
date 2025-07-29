# core/rag_query_system.py
import os
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Set your Hugging Face Hub API token here
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "[REMOVED_TOKEN]"

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

