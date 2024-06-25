import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherBitData,
  fetchWeatherHourlyForecast,
  fetchWeatherMapData,
} from "../../store/weather/thunksWeatherData";

import {
  Box,
  Typography,
  Grid,
  Input,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import useGeolocationAndCity from "../hooks/useGeolocation";
import { RootState } from "../../store";
import { setLoading, setNewCity } from "../../store/weather/weatherSlice";

interface ResponsiveDrawerProps {
  sx: any;
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({ sx }) => {
  const dispatch = useDispatch();

  const {
    weatherBitData,
    hourlyForecast,
    weatherData,
    loading,
    coordinates,
    city,
  } = useSelector((state: RootState) => state.weather);

  // Utilizamos el hook de geolocalización
  const { refreshLocation } = useGeolocationAndCity();

  // Efecto para disparar la búsqueda inicial o cuando cambia la ciudad
  useEffect(() => {
    const defaultCity = "Buenos Aires"; // Ciudad por defecto
    if (!city) {
      dispatch(setNewCity(defaultCity));
    } else {
      fetchData(city);
    }
  }, [city, dispatch]);

  // Función para manejar la búsqueda y carga de datos
  const fetchData = async (city: string) => {
    try {
      dispatch(setLoading(true));
      await fetchWeatherMapData(city, dispatch);

      const { lat, lon } = weatherData.coord; // Accedemos a las coordenadas desde weatherData

      if (lat !== undefined && lon !== undefined) {
        await fetchWeatherBitData({ lat, lon }, dispatch);
        await fetchWeatherHourlyForecast({ lat, lon }, dispatch);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (city.length === 0) return;

    await fetchData(city); // Llama a fetchData con la ciudad actualizada
  };

  const handleRefreshLocation = async () => {
    await refreshLocation();
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        paddingLeft: "8px",
        paddingTop: "2px",
        width: "100%",

        ...sx,
      }}
    >
      <Grid container sx={{ width: "99%", borderRadius: 2 }}>
        <form onSubmit={onSubmit} className="searchForm">
          <Grid
            sx={{
              width: "100%",
              height: "42px",
              display: "flex",
              marginLeft: "2%",
              justifyContent: "space-around",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <Input
              sx={{
                width: "97%",
                marginLeft: "6px",
                border: "none",
                outline: "none",
                borderBottom: "none",
                borderBlockStart: "none",
              }}
              type="text"
              placeholder="Search for cities"
              onChange={(e) => {
                dispatch(setNewCity(e.target.value));
              }}
            />
            <button
              type="submit"
              style={{ border: "none", backgroundColor: "rgba(0, 0, 0, 0.01)" }}
            >
              <SearchIcon />
            </button>
          </Grid>
        </form>
        <Button
          onClick={handleRefreshLocation}
          variant="contained"
          sx={{
            width: "40px",
            backgroundColor: "rgba(29, 159, 253, 0.5)",
            marginLeft: "90%",
            marginTop: "1%",
          }}
        >
          <MyLocationIcon />
        </Button>
      </Grid>

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!loading && weatherData && (
        <>
          <Typography sx={{ marginLeft: "8%", marginTop: "4%" }} variant="h4">
            <strong>
              {weatherData?.name} | {weatherData?.sys?.country}
            </strong>
          </Typography>
          <div>
            <Typography sx={{ marginLeft: "8%", fontSize: "14px" }} paragraph>
              Chance of Rain: {weatherBitData?.chanceOfRain > 0 ? "100%" : "0%"}
            </Typography>
            <br />
            <br />
            <br />
          </div>
          <Typography
            sx={{
              marginLeft: "8%",
              marginTop: "-2%",
              display: "flex",
              justifyContent: "space-between",
            }}
            variant="h2"
          >
            <strong>
              {parseFloat(weatherData?.main?.temp - 273.15).toFixed(0)}&deg;C
            </strong>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
              alt={weatherData?.weather[0].main}
              style={{
                width: "280px",
                height: "280px",
                position: "absolute",
                top: "20%",
                left: "40%",
              }}
            />
          </Typography>

          <Grid
            container
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              marginTop: 5,
              marginLef: "3%",
              marginBottom: 2,
              borderRadius: 3,
              position: "relative",
              left: "2%",
              width: "97%",
            }}
          >
            <Typography
              paragraph
              noWrap
              sx={{
                paddingTop: "5%",
                paddingLeft: "0.5%",
                fontSize: "16px",
                marginLeft: "2%",
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "700",
              }}
              component="div"
            >
              TODAY´S FORECAST
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{ paddingBottom: "5%", marginLeft: "1%" }}
            >
              {hourlyForecast &&
                hourlyForecast.list
                  .slice(0, 6)
                  .map((forecast: any, index: any) => (
                    <Grid
                      item
                      xs={2}
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginRight: "-0.5%",
                        height: "90%",
                        justifyContent: "space-around",
                        borderRight: "1px inset rgba(0.0, 0.0, 0.1)",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          textAlign: "center",

                          fontSize: "14px",
                          color: "rgba(0, 0, 0, 0.4)",
                          fontWeight: "900",
                        }}
                      >
                        {new Date(forecast.dt * 1000).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </Typography>
                      <img
                        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                        alt={forecast.weather[0].main}
                        style={{ width: "65px", height: "65px" }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          textAlign: "center",
                          color: "rgba(0, 0, 0, 1)",
                          fontSize: "22px",
                          fontWeight: "700",
                        }}
                      >
                        {Math.round(forecast.main.temp - 273.15)}&deg;C
                      </Typography>
                    </Grid>
                  ))}
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              padding: 3,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: 3,
              width: "97%",
              paddingLeft: "5%",
              marginLeft: "2%",
            }}
          >
            <Typography
              sx={{
                fontWeight: "900",
                color: "rgba(0, 0, 0, 0.5)",
                letterSpacing: "1px",
              }}
              paragraph
              noWrap
              component="div"
            >
              AIR CONDITIONS
            </Typography>
            <Grid item xs={12} container spacing={2}>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    display: "flex",
                    alignContent: "center",
                    color: "rgba(0, 0, 0, 0.4)",
                  }}
                  paragraph
                >
                  <ThermostatIcon sx={{ mr: 1 }} />
                  Real Feel:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: "700",
                    paddingLeft: "7%",
                  }}
                  paragraph
                >
                  <strong>
                    {Math.round(weatherData?.main?.feels_like - 273.15)}&deg;C
                  </strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    display: "flex",
                    alignContent: "center",
                    color: "rgba(0, 0, 0, 0.4)",
                  }}
                  paragraph
                >
                  <AirIcon sx={{ mr: 1 }} />
                  Wind Speed:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: "700",
                    paddingLeft: "7%",
                  }}
                  paragraph
                >
                  <strong>
                    {weatherData?.wind?.speed
                      ? Math.round(weatherData.wind.speed * 3.6)
                      : "N/A"}{" "}
                    km/h
                  </strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    display: "flex",
                    alignContent: "center",
                    color: "rgba(0, 0, 0, 0.4)",
                  }}
                  paragraph
                >
                  <WaterDropIcon sx={{ mr: 1 }} />
                  Chance of Rain:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: "700",
                    paddingLeft: "7%",
                  }}
                  paragraph
                >
                  <strong>
                    {weatherBitData?.chanceOfRain > 0 ? "100%" : "0%"}
                  </strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    display: "flex",
                    alignContent: "center",
                    color: "rgba(0, 0, 0, 0.4)",
                  }}
                  paragraph
                >
                  <Brightness7Icon sx={{ mr: 1 }} />
                  UV Index:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: "700",
                    paddingLeft: "7%",
                  }}
                  paragraph
                >
                  <strong>
                    {Math.round(weatherBitData?.data[0]?.uv || 0)}
                  </strong>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ResponsiveDrawer;
