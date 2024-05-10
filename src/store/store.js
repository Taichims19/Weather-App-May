import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { weatherSlice } from './weather/weatherSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    weather: weatherSlice.reducer,
  },
});
