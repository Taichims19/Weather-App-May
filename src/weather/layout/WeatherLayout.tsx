import { Box, Grid } from '@mui/material';
import { ResponsiveNavBar } from '../components/NavBar';
import {ResponsiveDrawer} from '../components/ResponsiveDrawer';
import WeeklyForecast from '../components/WeeklyForecast';
import useGeolocationAndCity from '../hooks/useGeolocation';



const drawerWidth = 240;


export const WeatherLayout = () => {
  const { loaded, coordinates, error, refreshLocation, city } = useGeolocationAndCity(); // Extraer las propiedades necesarias del hook
  return (
    <Grid container sx={{backgroundColor:"rgba(29, 159, 253, 1)"}}>
      <Grid item xs={12} sx={{ backgroundColor:"rgba(255,255,255)", display:"flex", padding:"30px", margin:"20px", width:"95%", borderRadius:"1%"}} className='animate__animated animate__fadeIn animate__faster' >

        <ResponsiveNavBar />

        <ResponsiveDrawer 
          drawerWidth={drawerWidth} 
          coordinates={coordinates} 
          city={city} 
          refreshLocation={refreshLocation}
          sx={{ flex: 1, minWidth: "60%" }}
          />
        {/* Sidebar drawerWidth*/}

        <Box component='main'sx={{ flex: 1, minWidth: "30%" }}>
          {/* Asegurarse de que las coordenadas estén cargadas y no haya error antes de renderizar WeeklyForecast */}
          {loaded && !error && coordinates.lat && coordinates.lon ? (
            <WeeklyForecast lat={coordinates.lat} lon={coordinates.lon} />
          ) : error ? (
            <div>Error retrieving your location: {error}</div>
          ) : (
            <div>Loading your location...</div>
          )}
        </Box>


      </Grid>
    </Grid>
  )
}
