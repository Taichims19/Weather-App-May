import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { weatherDailyForecast } from '../hooks/weatherMapData'; // Verifica la ruta

const WeeklyForecast = ({ lat, lon }) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await weatherDailyForecast(lat, lon);
      setForecastData(data);
    };

    fetchData();
  }, [lat, lon]);

  const translateWeather = (description) => {
    const weatherTranslations = {
      "Clear sky": "Cielo despejado",
      // Más traducciones...
    };

    return weatherTranslations[description] || description;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2} sx={{ width:"100%", backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius: 2 }}>
        <Typography paragraph sx={{ width: '100%', textAlign: 'center', marginBottom: 2 }}>
        7-DAY FORECAST
        </Typography>
        {forecastData.map((day, index) => (
          <Grid item xs={12} key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: "rgba(0, 0, 0, 0.4)" }}>
              {new Date(day.valid_date).toLocaleDateString('es-ES', { weekday: 'long' })}
            </Typography>
            <img src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt={translateWeather(day.weather.description)} style={{ width: '20px', height: '20px' }} />
            <Typography variant="caption" sx={{ color: "rgba(0, 0, 0, 1)", fontSize: "14px", fontWeight: "700" }}>
              {translateWeather(day.weather.description)}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(0, 0, 0, 1)", fontSize: "14px", fontWeight: "700" }}>
              {Math.round(day.max_temp)}°C / {Math.round(day.min_temp)}°C
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeeklyForecast;

