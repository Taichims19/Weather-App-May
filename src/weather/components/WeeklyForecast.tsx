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

  // Objeto para traducir la descripción del clima a español
  const weatherTranslations: { [key: string]: string } = {
    "overcast clouds": "Nublado",
    "scattered clouds": "Poco Nublado",
    "few clouds": "Pocas Nubes",
    "broken clouds": "Nubes Rotos",
    "clear sky": "Despejado",
    "light rain": "Lluvia Ligera",
    "moderate rain": "Lluvia Moderada",
    "heavy intensity rain": "Lluvia Intensa",
    // Puedes agregar más traducciones según sea necesario
  };

  // Función para obtener la descripción del clima traducida
  const translateWeather = (description: string) => {
    return weatherTranslations[description.toLowerCase()] || description;
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
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "16px",
            color: "rgba(0, 0, 0, 0.4)",
            fontWeight: "900",
            marginTop: "10%",
            marginBottom: "7%",

            marginLeft: "-13%",
          }}
        >
          Pronostico Clima 7Dias
        </Typography>
        {listWeatherData.map((day, index) => (
          <Grid
            item
            xs={11}
            key={index}
            sx={{
              display: "flex",

              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1%",
              position: "relative",
              bottom: "5%",
              left: "5%",
              borderBottom: "1px inset rgba(0.0, 0.0, 0.1)",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "900",
                color: "rgba(0, 0, 0, 0.4)",
                textAlign: "start",
                width: "25%",
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
                alignItems: "center",
                fontWeight: "700",
                paddingBottom: "15px",
                marginTop: "16px",
                width: "55%",
                display: "flex",
              }}
            >
              <img
                src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                alt={translateWeather(day.weather.description)}
                style={{
                  width: "60px",
                  height: "60px",
                  paddingRight: "5%",
                  marginTop: "1%",
                }}
              />
              {translateWeather(day.weather.description)}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(0, 0, 0, 1)",
                fontSize: "14px",
                fontWeight: "700",
                width: "25%",
              }}
            >
              {Math.round(day.max_temp)} / {Math.round(day.min_temp)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeeklyForecast;
