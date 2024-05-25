import { combineReducers, configureStore } from '@reduxjs/toolkit';
import  {weatherSlice}  from './weather/weatherSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  weather: weatherSlice.reducer,
});


const store = configureStore({
  reducer: rootReducer,
});

export default store;


