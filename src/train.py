from preprocessing import mat_X_preprocessed,mat_y_train,por_X_preprocessed,por_y_train
from sklearn.linear_model import LinearRegression,Ridge
from sklearn.ensemble import RandomForestRegressor
import joblib
mat_lr = LinearRegression()
mat_lr.fit(mat_X_preprocessed,mat_y_train)
joblib.dump(mat_lr,"models/mat_lr.pkl")

mat_ridge = Ridge(alpha=100)
mat_ridge.fit(mat_X_preprocessed,mat_y_train)
joblib.dump(mat_ridge,"models/mat_ridge.pkl")

mat_rf = RandomForestRegressor(n_estimators=500,random_state=42)
mat_rf.fit(mat_X_preprocessed, mat_y_train)
joblib.dump(mat_rf,"models/mat_rf.pkl")

por_lr = LinearRegression()
por_lr.fit(por_X_preprocessed,por_y_train)
joblib.dump(por_lr,"models/por_lr.pkl")

por_ridge = Ridge(alpha=10.0)
por_ridge.fit(por_X_preprocessed,por_y_train)
joblib.dump(por_ridge,"models/por_rid.pkl")

por_rf = RandomForestRegressor(n_estimators=100,random_state=42)
por_rf.fit(por_X_preprocessed, por_y_train)
joblib.dump(por_rf,"models/por_rf.pkl")
