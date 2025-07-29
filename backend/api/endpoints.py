from fastapi import APIRouter, UploadFile, File, Form
from core.document_processor import ingest_document, clean_text, chunk_document
from core.vector_search import create_embeddings, build_index, search_index
from core.rag_query_system import generate_response

router = APIRouter()

# In-memory cache for storing the vector index
index_cache = {}

@router.post("/query/")
async def query(file: UploadFile = File(...), query: str = Form(...)):
    file_path = f"./{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())

    if file_path not in index_cache:
        # Process the document
        text = ingest_document(file_path)
        cleaned_text = clean_text(text)
        chunks = chunk_document(cleaned_text)

        # Create embeddings and build the index
        embeddings = create_embeddings(chunks)
        index = build_index(chunks, embeddings)

        # Cache the index
        index_cache[file_path] = index
    else:
        index = index_cache[file_path]

    # Search the index for the query
    context = search_index(query, index)
    print("Retrieved Context:", context)

    # Generate the response
    response = generate_response(query, context)

    return {"response": response}

