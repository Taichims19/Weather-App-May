import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  WeatherData,
  WeatherbitData,
  WheaterState,
} from "../../helpers/interfacesWeather";

const initialState: WheaterState = {
  listWeatherData: [],
  weatherData: null,
  hourlyForecast: null,
  hourlyData: null,
  weatherBitData: null,
  data: null,
  todayWheather: null,
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    getNewWheathers(state, action: PayloadAction<WeatherData[]>) {
      //list 7 days from weatherbit in weeklyForecast
      state.listWeatherData = action.payload;
    },
    setNewTodayWheather(state, action: PayloadAction<any>) {
      state.todayWheather = action.payload;
    },
    setTodayChange(state, action: PayloadAction<WeatherbitData>) {
      //UV Index y Change of Rain
      console.log("action.payload ", action.payload);
      if (action.payload.weatherBitData) {
        state.weatherBitData = action.payload.weatherBitData;
      }
      if (action.payload.hourlyData) {
        state.hourlyData = action.payload.hourlyData;
      }
      if (action.payload.data) {
        state.data = action.payload.data;
      }
    },
    setHourlyForecast(state, action: PayloadAction<any>) {
      state.hourlyForecast = action.payload;
    },
    setWeatherData(state, action: PayloadAction<any>) {
      state.weatherData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Exportar los action creators para usar en los componentes
export const {
  getNewWheathers,
  setNewTodayWheather,
  setTodayChange,
  setHourlyForecast,
  setWeatherData,
  setLoading,
  setError,
} = weatherSlice.actions;

export default weatherSlice.reducer;
