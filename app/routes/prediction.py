from fastapi import APIRouter
from app.schemas import Predict,Student
import pandas as pd
import joblib
router = APIRouter()

@router.post("/predict/mat",response_model=Predict)
def math_predict(student:Student):
    data = student.model_dump()
    df = pd.DataFrame([data])
    X = df
    model = joblib.load("models/mat_rf.pkl")
    preprocessor = joblib.load("models/mat_preprocessor.pkl")
    X_prepro = preprocessor.transform(X)
    result = model.predict(X_prepro)
    return Predict(G3=float(result[0]))

@router.post("/predict/por",response_model=Predict)
def por_predict(student: Student):
    data = student.model_dump()
    df = pd.DataFrame([data])
    X = df
    model = joblib.load("models/por_rid.pkl")
    preprocessor = joblib.load("models/por_preprocessor.pkl")
    X_prepro = preprocessor.transform(X)
    result = model.predict(X_prepro)
    return Predict(G3=float(result[0]))