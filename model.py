# import pandas as pd
# import matplotlib.pyplot as plt
# from sklearn.linear_model import LinearRegression
# import numpy as np

# # Load the Excel file
# file_path = 'Training_excel.xlsx'
# xls = pd.ExcelFile(file_path)

# # Load the data from the first sheet
# df = pd.read_excel(file_path, sheet_name='Sheet1')

# # Clean the data
# # Set the first row as the header
# df.columns = df.iloc[0]
# df = df.drop(0)

# # Set the first column as the index
# df = df.set_index('Data Series')

# # Transpose the dataframe for easier manipulation
# df = df.transpose()

# # Convert the index to datetime format
# df.index = pd.to_datetime(df.index, errors='coerce', format='%Y %b')
# df = df[~df.index.isna()]

# # Convert all columns to numeric
# df = df.apply(pd.to_numeric, errors='coerce')

# # Prepare the data for prediction
# # We'll use the 'Total' column for prediction
# data = df[['Total']].dropna()

# # Generate time values for the linear regression model
# data['time'] = np.arange(len(data))

# # Fit a linear regression model
# model = LinearRegression()
# model.fit(data['time'].values.reshape(-1, 1), data['Total'])

# # Predict the next 60 months (5 years)
# future_time_5_years = np.arange(len(data), len(data) + 60)
# future_predictions_5_years = model.predict(future_time_5_years.reshape(-1, 1))

# # Create a dataframe for the 5-year predictions
# future_dates_5_years = pd.date_range(start=data.index[0], periods=61, freq='M')[1:]
# future_df_5_years = pd.DataFrame({'Total': future_predictions_5_years}, index=future_dates_5_years)

# # Plot the historical data and future predictions for 5 years
# plt.figure(figsize=(12, 6))
# plt.plot(data.index, data['Total'], label='Historical Data')
# plt.plot(future_df_5_years.index, future_df_5_years['Total'], label='Predictions (5 Years)', linestyle='--')
# plt.xlabel('Date')
# plt.ylabel('Total Food Numbers')
# plt.title('Historical and Predicted Food Numbers (5 Years)')
# plt.legend()
# plt.grid(True)
# plt.show()

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error
from keras.models import Sequential
from keras.layers import LSTM, Dense, Bidirectional

# Load the Excel file
file_path = 'Training_excel.xlsx'
xls = pd.ExcelFile(file_path)

# Load the data from the first sheet
df = pd.read_excel(file_path, sheet_name='Sheet1')

# Clean the data
# Set the first row as the header
df.columns = df.iloc[0]
df = df.drop(0)

# Set the first column as the index
df = df.set_index('Data Series')

# Transpose the dataframe for easier manipulation
df = df.transpose()

# Convert the index to datetime format
df.index = pd.to_datetime(df.index, errors='coerce', format='%Y %b')
df = df[~df.index.isna()]

# Convert all columns to numeric
df = df.apply(pd.to_numeric, errors='coerce')

# Prepare the data for prediction
# We'll use the 'Total' column for prediction
data = df[['Total']].dropna()

# Scale the data
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(data)

# Prepare the training and testing datasets
train_size = int(len(scaled_data) * 0.8)
train_data = scaled_data[:train_size]
test_data = scaled_data[train_size:]

# Create the dataset for the LSTM model
def create_dataset(dataset, time_step=1):
    X, Y = [], []
    for i in range(len(dataset) - time_step - 1):
        a = dataset[i:(i + time_step), 0]
        X.append(a)
        Y.append(dataset[i + time_step, 0])
    return np.array(X), np.array(Y)

time_step = 10
X_train, y_train = create_dataset(train_data, time_step)
X_test, y_test = create_dataset(test_data, time_step)

# Reshape input to be [samples, time steps, features] which is required for LSTM
X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

# Create the Bidirectional LSTM model
model = Sequential()
model.add(Bidirectional(LSTM(50, return_sequences=True, input_shape=(time_step, 1))))
model.add(Bidirectional(LSTM(50)))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mean_squared_error')

# Train the model
model.fit(X_train, y_train, epochs=100, batch_size=32, verbose=1)

# Make predictions
train_predict = model.predict(X_train)
test_predict = model.predict(X_test)

# Inverse transform the predictions
train_predict = scaler.inverse_transform(train_predict)
test_predict = scaler.inverse_transform(test_predict)
y_test = scaler.inverse_transform(y_test.reshape(-1, 1))

# Calculate the evaluation metrics
mae = mean_absolute_error(y_test, test_predict)
mse = mean_squared_error(y_test, test_predict)
rmse = np.sqrt(mse)

print(f'Mean Absolute Error (MAE): {mae}')
print(f'Mean Squared Error (MSE): {mse}')
print(f'Root Mean Squared Error (RMSE): {rmse}')

# Shift train predictions for plotting
train_predict_plot = np.empty_like(scaled_data)
train_predict_plot[:, :] = np.nan
train_predict_plot[time_step:len(train_predict) + time_step, :] = train_predict

# Shift test predictions for plotting
test_predict_plot = np.empty_like(scaled_data)
test_predict_plot[:, :] = np.nan
test_predict_plot[len(train_predict) + (time_step * 2) + 1:len(scaled_data) - 1, :] = test_predict

# Predict the next 12 months (1 year)
future_predictions = []
last_10_days = scaled_data[-time_step:]

for _ in range(12):
    X_input = last_10_days[-time_step:].reshape(1, -1)
    X_input = X_input.reshape((1, time_step, 1))
    pred = model.predict(X_input, verbose=0)
    future_predictions.append(pred[0][0])
    last_10_days = np.append(last_10_days, pred[0][0])
    last_10_days = last_10_days[1:]

# Inverse transform the future predictions
future_predictions = scaler.inverse_transform(np.array(future_predictions).reshape(-1, 1))

# Create a dataframe for the future predictions
last_date = data.index[0]
future_dates = pd.date_range(start=last_date, periods=13, freq='M')[1:]
future_df = pd.DataFrame({'Total': future_predictions.flatten()}, index=future_dates)

# Plot the historical data, test predictions, and future predictions
plt.figure(figsize=(12, 6))
plt.plot(data.index, scaler.inverse_transform(scaled_data), label='Original Data')
# plt.plot(data.index, train_predict_plot, label='Train Predict')
# plt.plot(data.index, test_predict_plot, label='Test Predict')
plt.plot(future_df.index, future_df['Total'], label='Future Predictions', linestyle='--')
plt.xlabel('Date')
plt.ylabel('Total Food Numbers')
plt.title('Bidirectional LSTM Predictions for Next 1 Year')
plt.legend()
plt.grid(True)
plt.show()
