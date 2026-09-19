from preprocessing import mat_X_test,mat_y_test,mat_X_preprocessed,mat_y_train,por_X_preprocessed,por_X_test,por_y_test,por_y_train
from sklearn.metrics import r2_score

import joblib

mat_lr = joblib.load("models/mat_lr.pkl")
mat_prepro = joblib.load("models/mat_preprocessor.pkl")
mat_ridge = joblib.load("models/mat_ridge.pkl")
mat_rf = joblib.load("models/mat_rf.pkl")

mat_prepro_X_test = mat_prepro.transform(mat_X_test)
mat_lr_predict = mat_lr.predict(mat_prepro_X_test)
lr_r2 = r2_score(mat_y_test,mat_lr_predict)
print("Linear :" ,lr_r2)
mat_ridge_predict = mat_ridge.predict(mat_prepro_X_test)
rid_r2 = r2_score(mat_y_test,mat_ridge_predict)
print("Ridge: ",rid_r2)
mat_rf_predict = mat_rf.predict(mat_prepro_X_test)
rf_r2 = r2_score(mat_y_test,mat_rf_predict)
print("Random Forest: ",rf_r2)

por_preprocessor = joblib.load("models/por_preprocessor.pkl")
por_lr = joblib.load("models/por_lr.pkl")
por_ridge = joblib.load("models/por_rid.pkl")
por_rf = joblib.load("models/por_rf.pkl")

por_prepro_X_test = por_preprocessor.transform(por_X_test)

por_lr_pred = por_lr.predict(por_prepro_X_test)
por_lr_r2 = r2_score(por_y_test,por_lr_pred)
print("Linear :" ,por_lr_r2)
por_rid_pred = por_ridge.predict(por_prepro_X_test)
por_rid_r2 = r2_score(por_y_test,por_rid_pred)
print("Ridge :" ,por_rid_r2)
por_rf_pred = por_rf.predict(por_prepro_X_test)
por_rf_r2 = r2_score(por_y_test,por_rf_pred)
print("Random Forest :" ,por_rf_r2)


print("Mat")
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import numpy as np

models = {
    "Linear Regression": mat_lr_predict,
    "Ridge": mat_ridge_predict,
    "Random Forest": mat_rf_predict
}

for name, pred in models.items():

    r2 = r2_score(mat_y_test, pred)
    mae = mean_absolute_error(mat_y_test, pred)
    rmse = np.sqrt(mean_squared_error(mat_y_test, pred))

    print(f"\n{name}")
    print(f"R²   : {r2:.4f}")
    print(f"MAE  : {mae:.4f}")
    print(f"RMSE : {rmse:.4f}")
print("por")
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import numpy as np

models = {
    "Linear Regression": por_lr_pred,
    "Ridge": por_rid_pred,
    "Random Forest":por_rf_pred
}

for name, pred in models.items():

    r2 = r2_score(por_y_test, pred)
    mae = mean_absolute_error(por_y_test, pred)
    rmse = np.sqrt(mean_squared_error(por_y_test, pred))

    print(f"\n{name}")
    print(f"R²   : {r2:.4f}")
    print(f"MAE  : {mae:.4f}")
    print(f"RMSE : {rmse:.4f}")