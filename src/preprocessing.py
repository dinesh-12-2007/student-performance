from data_loader import mat_df,por_df
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import joblib
from sklearn.model_selection import train_test_split
# Mat
mat_X = mat_df.drop("G3", axis=1)
mat_Y = mat_df["G3"]

mat_categorical_cols = mat_X.select_dtypes(include=["str"]).columns
mat_numerical_cols = mat_X.select_dtypes(include=["number"]).columns

preprocessor = ColumnTransformer(
    transformers = [
        ("cat",OneHotEncoder(handle_unknown="ignore"), mat_categorical_cols),
        ("num",StandardScaler(),mat_numerical_cols)
    ]
)


mat_X_train, mat_X_test, mat_y_train, mat_y_test = train_test_split(mat_X,mat_Y,test_size=0.2,random_state=42)
mat_X_preprocessed = preprocessor.fit_transform(mat_X_train)

joblib.dump(preprocessor, "models/mat_preprocessor.pkl")
# Por

por_X = por_df.drop("G3",axis=1)
por_Y = por_df["G3"]

por_categorical_cols = por_X.select_dtypes(include=["str"]).columns
por_numerical_cols = por_X.select_dtypes(include=['number']).columns
por_preproceessor = ColumnTransformer(
    transformers=[
        ("cat",OneHotEncoder(handle_unknown="ignore"),por_categorical_cols),
        ("num",StandardScaler(),por_numerical_cols)
    ]
)

por_X_train,por_X_test,por_y_train,por_y_test = train_test_split(por_X,por_Y,test_size=0.2,random_state=42)
por_X_preprocessed = por_preproceessor.fit_transform(por_X_train)
joblib.dump(por_preproceessor,"models/por_preprocessor.pkl")