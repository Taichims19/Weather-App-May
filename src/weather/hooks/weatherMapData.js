import axios from 'axios';
//Usando OpenWeatherMap
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'f2da8ec82f0d120b55026b88d23e66d5';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?'; // URL para la API de pronóstico a 3 horas
//Usando WeatherBit
const weatherBitBaseUrl = 'https://api.weatherbit.io/v2.0/current';
const weatherBitForecastUrl = 'https://api.weatherbit.io/v2.0/forecast/daily'; // URL para la API de pronóstico diario de WeatherBit
const weatherBitApiKey = '0b51b9a977984823883e3bbb4fde59f1'; // Reemplazar con tu clave API de Weatherbit

// Manejador de errores general para reutilización
const handleApiError = (error) => {
  if (error.response) {
    console.error(`API Error: ${error.response.status} - ${error.message}`);
    if (error.response.status === 429) {
      console.error(
        'Hemos excedido el límite de solicitudes al API de WeatherBit'
      );
    }
  } else {
    console.error(`Error: ${error.message}`);
  }
  throw error; // Re-lanzar para manejarlo en la llamada
};

// Datos meteorológicos de OpenWeatherMap
export const weatherMapData = async (cityname) => {
  const cacheKey = `weather-${cityname}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const cachedData = JSON.parse(cached);
    if (Date.now() - cachedData.timestamp < 3600000) {
      // Caché válido por 1 hora
      return cachedData.data;
    }
  }

  try {
    const { data } = await axios.get(`${baseUrl}q=${cityname}&appid=${apiKey}`);
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data: data,
        timestamp: Date.now(),
      })
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Pronóstico horario de OpenWeatherMap  Pronostico Cada 3 horas
export const weatherHourlyForecast = async (lat, lon) => {
  try {
    const { data } = await axios.get(
      `${forecastUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

// Datos de WeatherBit para precipitaciones y UV
export const getWeatherBitData = async (lat, lon) => {
  const cacheKey = `weatherbit-${lat}-${lon}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const cachedData = JSON.parse(cached);
    if (Date.now() - cachedData.timestamp < 3600000) {
      // Caché válido por 1 hora
      return cachedData.data;
    }
  }

  try {
    const response = await axios.get(
      `${weatherBitBaseUrl}?lat=${lat}&lon=${lon}&key=${weatherBitApiKey}`
    );
    const data = response.data.data[0];
    const result = {
      chanceOfRain: data.precip,
      uvIndex: data.uv,
    };

    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data: result,
        timestamp: Date.now(),
      })
    );

    return result;
  } catch (error) {
    handleApiError(error);
  }
};

// Pronóstico diario de OpenWeatherMap para 7 días
export const weatherDailyForecast = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${weatherBitForecastUrl}?lat=${lat}&lon=${lon}&days=7&key=${weatherBitApiKey}`
    );
    return response.data.data; // Devuelve los datos diarios
  } catch (error) {
    handleApiError(error);
  }
};
