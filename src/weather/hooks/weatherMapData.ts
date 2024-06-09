import axios from "axios";
import {
  BASE_URL,
  API_KEY,
  FORECAST_URL,
  WEATHERBIT_BASE_URL,
  WEATHERBIT_API_KEY,
  WEATHERBIT_FORECAST_URL,
} from "./constCallsApi";
import {
  DetailedWeatherData,
  WeatherbitData,
} from "../../helpers/interfacesWeather";
import { defaultWeatherData } from "../../helpers/Wheater";

const handleApiError = async (error: unknown) => {
  try {
    throw error; // Relanzar para manejarlo en la llamada
  } catch (error: any) {
    if (
      error.message === "Request failed with status code 429" ||
      (error.response.status > 400 && error.response.status < 500)
    ) {
      console.log("Error HTTP:", error.message);
      // Implementar lógica de caché aquí
    } else {
      console.error(`Error desconocido: ${error}`);
    }
  }
};

// Datos meteorológicos de OpenWeatherMap
export const weatherMapData = async (
  city: string
): Promise<DetailedWeatherData> => {
  const cacheKey = `weather-${city}`;

  try {
    const { data } = await axios.get(`${BASE_URL}q=${city}&appid=${API_KEY}`); // URL corregida
    console.log("ujhjhjhnj", data);

    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data, timestamp: Date.now() })
    );
    return data;
  } catch (error) {
    // handleApiError(error);
    return defaultWeatherData; // Devuelve el objeto de respaldo en caso de error
  }
};
// Pronóstico horario de OpenWeatherMap
export const weatherHourlyForecast = async (
  lat: number,
  lon: number
): Promise<any> => {
  //checkApiCallBlock();
  try {
    const { data } = await axios.get(
      `${FORECAST_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log(error);
    if (
      error.message === "Request failed with status code 429" ||
      (error.response.status > 400 && error.response.status < 500)
    ) {
      console.log("error ", error.message);
      /// logica del cache
    }
  }
};

// Datos de WeatherBit para precipitaciones y UV
export const getWeatherBitData = async (
  lat: number,
  lon: number
): Promise<WeatherbitData> => {
  const cacheKey = `weatherbit-${lat}-${lon}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const cachedData = JSON.parse(cached);
    if (Date.now() - cachedData.timestamp < 3600000) {
      return cachedData.data;
    }
  }

  try {
    const response = await axios.get(
      `${WEATHERBIT_BASE_URL}?lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}`
    );
    const data = response.data.data[0];
    const result: WeatherbitData = {
      name: data.city_name, // Necesario agregar esta propiedad
      chanceOfRain: data.precip, // Necesario agregar esta propiedad
      uvIndex: data.uv, // Necesario agregar esta propiedad
      weatherBitData: {
        chanceOfRain: data.precip,
        uvIndex: data.uv,
      },
      count: response.data.count,
      data: response.data.data,
    };

    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data: result, timestamp: Date.now() })
    );
    return result;
  } catch (error) {
    throw error;
  }
};
// Pronóstico diario de OpenWeatherMap para 7 días
export const weatherDailyForecast = async (city: string): Promise<any> => {
  // checkApiCallBlock();
  try {
    const response = await axios.get(
      `${WEATHERBIT_FORECAST_URL}?city=${city}&days=7&key=${WEATHERBIT_API_KEY}`
    );

    return response.data.data;
  } catch (error: any) {
    console.log(error);
    if (
      error.message === "Request failed with status code 429" ||
      (error.response.status > 400 && error.response.status < 500)
    ) {
      console.log("error ", error.message);
      /// logica del cache
    }
  }
};
