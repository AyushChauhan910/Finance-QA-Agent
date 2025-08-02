import re
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pypdf import PdfReader

# core/document_processor.py

def ingest_document(file_path: str) -> str:
    """Ingests a document from the given file path."""
    try:
        if file_path.endswith(".pdf"):
            reader = PdfReader(file_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
            return text
        else:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()
    except FileNotFoundError:
        return "Error: File not found."

def clean_text(text: str) -> str:
    """Cleans the text by removing unnecessary characters and formatting."""
    text = text.lower()
    # Preserve $, %, commas and dots to retain numeric context
    text = re.sub(r"[^a-zA-Z0-9\s\$%,\.]", "", text)
    return text

def chunk_document(text: str) -> list[str]:
    """Chunks the document into smaller pieces for processing."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1500,
        chunk_overlap=300,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

