from fastapi import FastAPI
from dotenv import load_dotenv
from api import endpoints

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

app.include_router(endpoints.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Finance QA Agent API"}

