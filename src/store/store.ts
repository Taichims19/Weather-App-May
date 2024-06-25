import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./weather/weatherSlice";
import { authSlice } from "./auth/authSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  weather: weatherSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
