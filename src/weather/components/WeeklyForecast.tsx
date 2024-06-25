import { useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchWeatherListData } from "../../store/weather/thunksWeatherData";

// Definir la interfaz para las propiedades del componente WeeklyForecast
interface WeeklyForecastProps {}

const WeeklyForecast: React.FC<WeeklyForecastProps> = () => {
  const dispatch = useDispatch();
  const { listWeatherData, city } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    fetchWeatherListData(city, dispatch); // Llama a fetchWeatherListData con city y dispatch como argumentos
  }, [city, dispatch]);

  const translateWeather = (description: string) => {
    const weatherTranslations: { [key: string]: string } = {
      "Clear sky": "Cielo despejado",
      // Más traducciones...
    };

    return weatherTranslations[description] || description;
  };

  return (
    <Box sx={{ width: "90%", height: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          height: "100%",
          marginTop: "15%",
          marginLeft: "3%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
        }}
      >
        <Typography
          paragraph
          sx={{ width: "100%", textAlign: "center", marginBottom: 2 }}
        >
          Pronostico Climatico : 7Dias
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
              justifyContent: "space-around",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "900",
                color: "rgba(0, 0, 0, 0.4)",
                textAlign: "start",
              }}
            >
              {new Date(day.valid_date).toLocaleDateString("es-ES", {
                weekday: "long",
              })}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "rgba(0, 0, 0, 1)",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              <img
                src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                alt={translateWeather(day.weather.description)}
                style={{ width: "30px", height: "30px" }}
              />
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
