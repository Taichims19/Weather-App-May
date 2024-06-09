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
import {
  defaultWeatherBitPrecipUv,
  defaultWeatherData,
  defaultWeatherDataForecast,
  empityWheather,
} from "../../helpers/Wheater";
import { WeatherbitData } from "../../helpers/interfacesWeather";

// Pronóstico diario de OpenWeatherMap para 7 días
export const fetchWeatherListData = async (city: string, dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const dailyForecast = await weatherDailyForecast(city);

    if (dailyForecast) {
      dispatch(getNewWheathers(dailyForecast));
    } else {
      dispatch(getNewWheathers(empityWheather));
    }

    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error.response ? error.response.data : error.message));
    return error.response ? error.response.data : error.message;
  } finally {
    dispatch(setLoading(false));
  }
};

// Datos de WeatherBit para precipitaciones y UV
export const fetchWeatherBitData = async (
  { lat, lon }: { lat: number; lon: number },
  dispatch: any
) => {
  try {
    dispatch(setLoading(true));
    const weatherBitData: WeatherbitData = await getWeatherBitData(lat, lon);

    if (weatherBitData) {
      dispatch(setTodayChange(weatherBitData));
    } else {
      dispatch(setTodayChange(defaultWeatherBitPrecipUv));
    }

    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error.response ? error.response.data : error.message));
    return error.response ? error.response.data : error.message;
  } finally {
    dispatch(setLoading(false));
  }
};

// Pronóstico horario de OpenWeatherMap
export const fetchWeatherHourlyForecast = async (
  { lat, lon }: { lat: number; lon: number },
  dispatch: any
) => {
  try {
    dispatch(setLoading(true));
    const hourlyForecast = await weatherHourlyForecast(lat, lon);

    if (hourlyForecast) {
      dispatch(setHourlyForecast(hourlyForecast));
    } else {
      dispatch(setHourlyForecast(defaultWeatherDataForecast));
    }

    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error.response ? error.response.data : error.message));
    return error.response ? error.response.data : error.message;
  } finally {
    dispatch(setLoading(false));
  }
};
// Datos meteorológicos de OpenWeatherMap
export const fetchWeatherMapData = async (city: string, dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const weatherData = await weatherMapData(city);

    if (weatherData) {
      dispatch(setWeatherData(weatherData));
    } else {
      dispatch(setWeatherData(defaultWeatherData));
    }

    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error.response ? error.response.data : error.message));
    return error.response ? error.response.data : error.message;
  } finally {
    dispatch(setLoading(false));
  }
};
