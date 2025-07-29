# core/vector_search.py
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

def create_embeddings(text_chunks: list[str]):
    """Creates embeddings for the given text chunks."""
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return embeddings

def build_index(text_chunks: list[str], embeddings):
    """Builds a FAISS index from the embeddings."""
    index = FAISS.from_texts(text_chunks, embeddings)
    return index

def search_index(query: str, index):
    """Searches the index for the given query."""
    docs = index.similarity_search(query)
    return docs

