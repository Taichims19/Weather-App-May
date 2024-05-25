import { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { weatherDailyForecast } from "../hooks/weatherMapData"; // Verifica la ruta
import { getNewWheathers } from "../../store/weather/weatherSlice";
import { empityWheather } from "../../helpers/Wheater";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

// Definir la interfaz para los datos de un día del pronóstico
interface WeatherDay {
  valid_date: string;
  weather: {
    icon: string;
    description: string;
  };
  max_temp: number;
  min_temp: number;
}

// Definir la interfaz para las propiedades del componente WeeklyForecast
interface WeeklyForecastProps {
  city: string; // Se requiere la ciudad
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({
  city,
}: WeeklyForecastProps) => {
  const dispatch = useDispatch();
  const { listWeatherData } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await weatherDailyForecast(city);
        if (response) {
          dispatch(getNewWheathers(response));
        } else {
          const data = empityWheather;
          dispatch(getNewWheathers(data));
        }
      } catch (error) {
        console.error("Error al obtener el pronóstico del tiempo:", error);
      }
    };

    fetchData();
  }, [city]);

  const translateWeather = (description: string) => {
    const weatherTranslations: { [key: string]: string } = {
      "Clear sky": "Cielo despejado",
      // Más traducciones...
    };

    return weatherTranslations[description] || description;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
        }}
      >
        <Typography
          paragraph
          sx={{ width: "100%", textAlign: "center", marginBottom: 2 }}
        >
          7-DAY FORECAST
        </Typography>
        {listWeatherData.map((day, index) => (
          <Grid
            item
            xs={12}
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.4)" }}
            >
              {new Date(day.valid_date).toLocaleDateString("es-ES", {
                weekday: "long",
              })}
            </Typography>
            <img
              src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
              alt={translateWeather(day.weather.description)}
              style={{ width: "20px", height: "20px" }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "rgba(0, 0, 0, 1)",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {translateWeather(day.weather.description)}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(0, 0, 0, 1)",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {Math.round(day.max_temp)}°C / {Math.round(day.min_temp)}°C
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeeklyForecast;
