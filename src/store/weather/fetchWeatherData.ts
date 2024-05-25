import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  weatherMapData,
  weatherHourlyForecast,
  getWeatherBitData,
} from '../../weather/hooks/weatherMapData';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await weatherMapData(city);
      const hourlyData = await weatherHourlyForecast(
        data.coord.lat,
        data.coord.lon
      );
      const weatherBitData = await getWeatherBitData(
        data.coord.lat,
        data.coord.lon
      );

      const test={
        weatherBitData,
        hourlyData,
        data
      }
      
      return { todayWheather:test };
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
