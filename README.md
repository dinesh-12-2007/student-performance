# Student Performance Prediction

A Machine Learning web application that predicts a student's final grade (`G3`) using academic, demographic, and social attributes.

The project uses separate Machine Learning models for **Mathematics** and **Portuguese** subjects and provides predictions through a **FastAPI backend** with a simple web frontend.

---

## 🚀 Features

- Predicts a student's final grade (`G3`)
- Supports:
  - Mathematics
  - Portuguese
- Separate ML models for each subject
- Data preprocessing using Scikit-learn
- FastAPI REST API
- Interactive frontend
- JSON-based prediction requests
- GitHub Actions for automated code checking
- Model and preprocessor saved using Joblib

---

## 🧠 Machine Learning

The project uses the UCI Student Performance datasets:

- `student-mat.csv` — Mathematics
- `student-por.csv` — Portuguese

The target variable is:

```text
G3
