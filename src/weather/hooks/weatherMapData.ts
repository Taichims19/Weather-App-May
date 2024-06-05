import axios, { AxiosError } from "axios";
import {
  BASE_URL,
  API_KEY,
  FORECAST_URL,
  WEATHERBIT_BASE_URL,
  WEATHERBIT_API_KEY,
  WEATHERBIT_FORECAST_URL,
} from "./constCallsApi";
import { WeatherbitData } from "../../helpers/interfacesWeather";

// Variable para controlar si debemos evitar hacer llamadas a la API después de errores
let apiCallBlockedUntil = 0;

// Definimos la función para manejar errores de la API
const handleApiError = (error: unknown) => {
  const err = error as AxiosError<any>;
  if (err.response) {
    console.error(
      `API Error: ${err.response.status} - ${err.response.data.message}`
    );
    if (err.response.status === 429) {
      // Bloquear nuevas llamadas API durante 10 minutos después de recibir error 429
      apiCallBlockedUntil = Date.now() + 10 * 60 * 1000;
      console.error(
        "Hemos excedido el límite de solicitudes al API de WeatherBit"
      );
    }
  } else if (err.message) {
    console.error(`Error: ${err.message}`);
  } else {
    console.error(`Error desconocido: ${err}`);
  }
  throw err; // Relanzar para manejarlo en la llamada
};

// Función para verificar si las llamadas API están bloqueadas
const checkApiCallBlock = () => {
  if (Date.now() < apiCallBlockedUntil) {
    throw new Error("API call temporarily blocked due to frequent requests.");
  }
};

// Datos meteorológicos de OpenWeatherMap
export const weatherMapData = async (city: string): Promise<any> => {
  checkApiCallBlock();
  const cacheKey = `weather-${city}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const cachedData = JSON.parse(cached);
    if (Date.now() - cachedData.timestamp < 3600000) {
      return cachedData.data; // Usar datos de caché si son recientes
    }
  }

  try {
    const { data } = await axios.get(`${BASE_URL}q=${city}&appid=${API_KEY}`);
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data, timestamp: Date.now() })
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Pronóstico horario de OpenWeatherMap
export const weatherHourlyForecast = async (
  lat: number,
  lon: number
): Promise<any> => {
  checkApiCallBlock();
  try {
    const { data } = await axios.get(
      `${FORECAST_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return data;
  } catch (error) {
    handleApiError(error);
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
      weatherBitData: {
        chanceOfRain: data.precip,
        uvIndex: data.uv,
      },
      count: 1,
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
  checkApiCallBlock();
  try {
    const response = await axios.get(
      `${WEATHERBIT_FORECAST_URL}?city=${city}&days=7&key=${WEATHERBIT_API_KEY}`
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
