import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  weatherMapData,
  weatherHourlyForecast,
  getWeatherBitData,
  weatherDailyForecast,
} from "../../weather/hooks/weatherMapData";

import {
  getNewWheathers,
  setError,
  setHourlyForecast,
  setLoading,
  setTodayChange,
  setWeatherData,
} from "./weatherSlice";
import { empityWheather } from "../../helpers/Wheater";

export const fetchWeatherListData = createAsyncThunk(
  // Pronostico 7 Days
  "weather/fetchWeatherData",
  async (city: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true)); // Despacha una acción para indicar que la carga ha comenzado
      const dailyForecast = await weatherDailyForecast(city);
      // Despacha la acción getNewWheathers aquí, si es necesario
      if (dailyForecast) {
        dispatch(getNewWheathers(dailyForecast));
      } else {
        dispatch(getNewWheathers(empityWheather)); // Ajusta según tu lógica
      }

      dispatch(setLoading(false)); // Indicar que la carga ha terminado
    } catch (error: any) {
      dispatch(setError(error.response ? error.response.data : error.message)); // Manejar el error
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    } finally {
      dispatch(setLoading(false)); // Indicar que la carga ha terminado
    }
  }
);

export const fetchWeatherBitData = createAsyncThunk(
  // Datos de WeatherBit para precipitaciones y UV
  "weather/fetchWeatherBitData",
  async (
    { lat, lon }: { lat: number; lon: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setLoading(true)); // Indicar que la carga ha comenzado

      const weatherBitData = await getWeatherBitData(lat, lon);

      if (weatherBitData) {
        dispatch(
          setTodayChange({
            weatherBitData,
            hourlyData: undefined,
            count: 0,
            data: [],
          })
        );
      } else {
        dispatch(
          setTodayChange({
            weatherBitData: { chanceOfRain: 0, uvIndex: 0 },
            hourlyData: undefined,
            count: 0,
            data: [],
          })
        ); // Ajusta según tu lógica
      }

      dispatch(setLoading(false)); // Indicar que la carga ha terminado
    } catch (error: any) {
      dispatch(setError(error.response ? error.response.data : error.message)); // Manejar el error
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    } finally {
      dispatch(setLoading(false)); // Indicar que la carga ha terminado
    }
  }
);

export const fetchWeatherHourlyForecast = createAsyncThunk(
  // Pronóstico horario de OpenWeatherMap
  "weather/fetchWeatherHourlyForecast",
  async (
    { lat, lon }: { lat: number; lon: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setLoading(true)); // Indicar que la carga ha comenzado

      const hourlyForecast = await weatherHourlyForecast(lat, lon);

      if (hourlyForecast) {
        dispatch(setHourlyForecast(hourlyForecast));
      } else {
        dispatch(setHourlyForecast([])); // Ajusta según tu lógica
      }

      dispatch(setLoading(false)); // Indicar que la carga ha terminado
    } catch (error: any) {
      dispatch(setError(error.response ? error.response.data : error.message)); // Manejar el error
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    } finally {
      dispatch(setLoading(false)); // Indicar que la carga ha terminado
    }
  }
);
export const fetchWeatherMapData = createAsyncThunk(
  // Datos meteorológicos de OpenWeatherMap
  "weather/fetchWeatherMapData",
  async (city: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true)); // Indicar que la carga ha comenzado

      const weatherData = await weatherMapData(city);

      if (weatherData) {
        dispatch(setWeatherData(weatherData));
      } else {
        dispatch(setWeatherData(null)); // Ajusta según tu lógica
      }

      dispatch(setLoading(false)); // Indicar que la carga ha terminado
    } catch (error: any) {
      dispatch(setError(error.response ? error.response.data : error.message)); // Manejar el error
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    } finally {
      dispatch(setLoading(false)); // Indicar que la carga ha terminado
    }
  }
);
// const test={
//   weatherBitData,
//   hourlyData,
//   data
// }
// return { todayWheather:test };
