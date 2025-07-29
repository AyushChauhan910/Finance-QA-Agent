from fastapi import FastAPI
from api import endpoints

app = FastAPI()

app.include_router(endpoints.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Finance QA Agent API"}

