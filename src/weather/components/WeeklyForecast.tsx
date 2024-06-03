import { useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchWeatherListData } from "../../store/weather/thunksWeatherData";

// Definir la interfaz para las propiedades del componente WeeklyForecast
interface WeeklyForecastProps {
  city: string; // Se requiere la ciudad
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ city }) => {
  const dispatch = useDispatch();
  const { listWeatherData } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    fetchWeatherListData(city); // Llamar al thunk fetchWeatherListData
  }, [city, dispatch]);

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
