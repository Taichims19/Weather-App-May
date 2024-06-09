import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  DetailedWeatherData,
  WeatherData,
  WeatherDataForecast,
  WeatherbitData,
  WheaterState,
} from "../../helpers/interfacesWeather";
import { defaultWeatherDataForecast } from "../../helpers/Wheater";

const initialState: WheaterState = {
  listWeatherData: [],
  weatherData: null,
  hourlyForecast: defaultWeatherDataForecast,
  weatherBitData: null,
  data: null, // Cambia 'any[]' al tipo adecuado si es posible
  todayWheather: null,
  coordinates: null,
  loading: false,
  error: null,
  city: "",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    getNewWheathers(state, action: PayloadAction<WeatherData[]>) {
      //list 7 days from weatherbit in weeklyForecast
      state.listWeatherData = action.payload;
    },
    setNewCity(state, action: PayloadAction<any>) {
      state.city = action.payload;
    },
    setCoordinates: (
      //Manejo de actualizador del estado con coordenadas
      state,
      action: PayloadAction<{ lat: number; lon: number }>
    ) => {
      state.coordinates = action.payload;
    },
    setTodayChange(state, action: PayloadAction<WeatherbitData>) {
      //UV Index y Change of Rain
      console.log("action.payload ", action.payload);
      state.weatherBitData = action.payload;
    },
    setHourlyForecast(state, action: PayloadAction<WeatherDataForecast>) {
      // Pronóstico horario
      state.hourlyForecast = action.payload;
    },
    setWeatherData(state, action: PayloadAction<DetailedWeatherData>) {
      // Datos meteorológicos del dia
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
  setNewCity,
  setCoordinates,
  setTodayChange,
  setHourlyForecast,
  setWeatherData,
  setLoading,
  setError,
} = weatherSlice.actions;

export default weatherSlice.reducer;
