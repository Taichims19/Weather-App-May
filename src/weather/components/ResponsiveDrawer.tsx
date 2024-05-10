import { useCallback, useEffect, useState } from 'react';
import { Box, Typography, Grid, Input, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CircularProgress from '@mui/material/CircularProgress';
import { weatherMapData, weatherHourlyForecast, getWeatherBitData } from '../hooks/weatherMapData';
import useGeolocationAndCity from '../hooks/useGeolocation';



export const ResponsiveDrawer = ({ coordinates, city }) => {
  const { loaded, refreshLocation } = useGeolocationAndCity();
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [localCity, setLocalCity] = useState(city); 
  const [weatherBitData, setWeatherBitData] = useState({ uvIndex: null, chanceOfRain: null });
  const [loading, setLoading] = useState(false);
  

  const getData = useCallback(async (cityName) => {
    if (!cityName) {
      console.log("No city name provided");
      return;
    }
    setLoading(true);
    try {
      const data = await weatherMapData(cityName);
      setWeatherData(data);
      await getHourlyData(data.coord.lat, data.coord.lon);
      const weatherBitResult = await getWeatherBitData(data.coord.lat, data.coord.lon);
      setWeatherBitData(weatherBitResult);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }, [setLoading, setWeatherData, setWeatherBitData]);
  
  useEffect(() => {
    // Aquí debe referirse a `localCity` en lugar de `geoCity`
    if (localCity && city && localCity !== city) {
        setLocalCity(city);  // Actualiza el estado de localCity con el nuevo valor de city
        getData(city);  // Llama a getData para cargar los datos de la nueva ubicación
    }
  }, [localCity, city, loaded]); // Añade `getData` como dependencia si se usa dentro del useEffect

  const getHourlyData = async (lat, lon) => {
    try {
      const data = await weatherHourlyForecast(lat, lon);
      setHourlyForecast(data);
    } catch (error) {
      console.error("Error fetching hourly forecast:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (localCity === "" || !localCity) return;
    setLoading(true);
    getData(localCity);  // Asegúrate de pasar localCity aquí
  };

  const handleRefreshLocation = () => {
    refreshLocation(); // Llama a la función refreshLocation del hook
  };


  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingLeft:"8px", paddingTop:"2px", width: "100%" }}
    >
      <Grid container sx={{width: '96%',borderRadius:2}} >
        <form onSubmit={onSubmit} className='searchForm'>
          <Grid sx={{width:"100%",height:"42px", display:"flex", justifyContent:"space-around", backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius:2}} >
            <Input
              sx={{width:"90%",marginLeft:"6px"}}
              type='text'
              placeholder='Search for cities'
              onChange={(e) => setLocalCity(e.target.value)}
            />
            <button type='submit'>
              <SearchIcon />
            </button>
          </Grid>
        </form>
        {/* Botón para actualizar la ubicación */}
        <Button onClick={handleRefreshLocation} variant="contained" sx={{width:"80%",backgroundColor:"rgba(0, 0, 0, 0.3)", marginLeft:"60%"}}>
          Refresh Location
        </Button>
      </Grid>


     {loading && (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress  />
      </Box>
    )}

    {!loading && weatherData && (
      <>
        <Typography sx={{marginLeft:"5%", marginTop:"4%"}} variant="h4">
          <strong>{weatherData.name} | {weatherData.sys.country}</strong>
        </Typography>
        <div>
        <Typography sx={{marginLeft:"5%", fontSize:"14px"}}  paragraph>
                Chance of Rain: {weatherBitData.chanceOfRain > 0 ? '100%' : '0%'}
              </Typography>
          <br /><br /><br />
        </div>
        <Typography sx={{marginLeft:"5%"}} variant='h3'>
          <strong>{parseFloat(weatherData.main.temp - 273.15).toFixed(0)}&deg;C</strong>
        </Typography>
        
        <Grid container sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)",marginTop:10,marginLef:1,marginBottom:2, borderRadius:3, width:"94%" }}>
          <Typography paragraph noWrap sx={{paddingTop:"7%", paddingLeft:"5%", fontSize:"16px", color: "rgba(0, 0, 0, 0.5)", fontWeight:"700" }} component='div'>TODAY´S FORECAST</Typography>
          <Grid container spacing={2} sx={{ padding: 2, paddingBottom:8}}>
            {hourlyForecast && hourlyForecast.list.slice(0, 6).map((forecast, index) => (
            <Grid item xs={2} key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="caption" sx={{ textAlign: 'center', padding:1, fontSize:"14px", color: "rgba(0, 0, 0, 0.4)",fontWeight:"700"}}>
              {new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt={forecast.weather[0].main} style={{ maxWidth: '100%', height: 'auto' }} />
            <Typography variant="caption" sx={{ textAlign: 'center',color: "rgba(0, 0, 0, 1)", fontSize:"20px", fontWeight:"700" }}>
              {Math.round(forecast.main.temp - 273.15)}&deg;C
            </Typography>
        </Grid>
      ))}
          </Grid>
        </Grid>

        <Grid container  sx={{padding: 3, backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius:3,width:"94%", marginLeft:"1%"  }}>
          <Typography sx={{fontWeight:"700", color: "rgba(0, 0, 0, 0.5)", letterSpacing:"5px"}}paragraph noWrap component='div'>AIR CONDITIONS</Typography>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={6} sx={{ display: 'flex', flexDirection: "column" }}>
              <Typography sx={{fontSize:"16px",fontWeight:"700", display:"flex", alignContent:"center", color: "rgba(0, 0, 0, 0.4)"}} paragraph>
                <ThermostatIcon sx={{ mr: 1 }} />
                Real Feel:
              </Typography>
              <Typography sx={{fontSize:"22px",fontWeight:"700", paddingLeft:"15%"}} paragraph>
                <strong>{Math.round(weatherData.main.feels_like - 273.15)}&deg;C</strong>
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', flexDirection: "column" }}>
              <Typography sx={{fontSize:"16px",fontWeight:"700", display:"flex", alignContent:"center",color: "rgba(0, 0, 0, 0.4)"}} paragraph>
                <AirIcon sx={{ mr: 1 }} />
                Wind Speed:
              </Typography>
              <Typography sx={{fontSize:"22px",fontWeight:"700", paddingLeft:"15%"}} paragraph>
                <strong>{Math.round(weatherData.wind.speed * 3.6)} km/h</strong>
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', flexDirection: "column" }}>
              <Typography sx={{fontSize:"16px",fontWeight:"700", display:"flex", alignContent:"center",color: "rgba(0, 0, 0, 0.4)"}} paragraph>
                <WaterDropIcon sx={{ mr: 1 }} />
                Chance of Rain:
              </Typography>
              <Typography sx={{fontSize:"22px",fontWeight:"700", paddingLeft:"15%"}} paragraph>
                <strong>{weatherBitData.chanceOfRain > 0 ? '100%' : '0%'}</strong>
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', flexDirection: "column" }}>
              
              <Typography sx={{fontSize:"16px",fontWeight:"700", display:"flex", alignContent:"center", color: "rgba(0, 0, 0, 0.4)"}} paragraph>
                <Brightness7Icon sx={{ mr: 1 }} />
                UV Index:
                
              </Typography>
              <Typography sx={{fontSize:"22px",fontWeight:"700", paddingLeft:"15%"}} paragraph>
                <strong>{Math.round(weatherBitData.uvIndex)}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </>
    )}
    </Box>
  );
};