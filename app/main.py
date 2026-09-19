from fastapi import FastAPI

from app.schemas import Predict,Student
from app.routes.prediction import router
app = FastAPI()

@app.get("/")
def home():
    return {"message:Student Performance API is running."}

app.include_router(router)
