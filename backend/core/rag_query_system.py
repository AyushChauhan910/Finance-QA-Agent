# core/rag_query_system.py
import os
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import re

# Load environment variables from .env file
load_dotenv()

# Load Hugging Face token from environment variable
# Set HUGGINGFACEHUB_API_TOKEN in your environment or .env file
if not os.getenv("HUGGINGFACEHUB_API_TOKEN"):
    raise ValueError("HUGGINGFACEHUB_API_TOKEN environment variable is required")

# Load the model and tokenizer
PROMPT_TEMPLATE = (
    "You are a financial analyst. From the context, identify the FY-2023 and FY-2022 total net-sales (or revenue) figures and state the year-over-year change both in absolute dollar terms and percentage. "
    "Return a concise sentence. If the required figures are missing, answer 'Data not found'.\n\n"
    "Context:\n{context}\n\nQuestion: {question}\nAnswer:"
)

model_name = "google/flan-t5-large"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)


def _post_process(raw: str) -> str:
    """Detect four-number patterns in revenue answers and rewrite them."""
    nums = [n.replace(',', '') for n in re.findall(r"\d[\d,]{3,}", raw)]
    if len(nums) >= 4:
        fy23, fy22 = int(nums[2]), int(nums[3])
        try:
            pct = (fy23 - fy22) / fy22 * 100
        except ZeroDivisionError:
            pct = 0
        return (
            f"FY-2023 net sales were ${fy23:,}, compared with ${fy22:,} in "
            f"FY-2022 — a {pct:.1f}% change."
        )
    return raw

def generate_response(query: str, context: list):
    """Generates a response using the RAG pipeline."""
    # Prepare the input for the model
    # Build context string and truncate to fit model token limit
    context_str = " ".join([doc.page_content for doc in context])
    max_ctx_tokens = 480
    tokens = tokenizer.encode(context_str)[:max_ctx_tokens]
    context_str = tokenizer.decode(tokens, skip_special_tokens=True)
    input_text = PROMPT_TEMPLATE.format(context=context_str, question=query)
    input_ids = tokenizer(input_text, return_tensors="pt").input_ids

    # Generate the response
    outputs = model.generate(
        input_ids,
        max_length=256,
        no_repeat_ngram_size=4,
        num_beams=4,
    )
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Basic fallback formatting if the model still outputs four bare numbers
    return _post_process(response)

