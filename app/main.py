from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import Predict,Student
from app.routes.prediction import router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message":"Student Performance API is running."}

app.include_router(router)
