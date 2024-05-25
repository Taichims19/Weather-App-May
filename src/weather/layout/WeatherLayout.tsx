import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ResponsiveNavBar } from '../components/NavBar';
import {ResponsiveDrawer} from '../components/ResponsiveDrawer';
import WeeklyForecast from '../components/WeeklyForecast';




const drawerWidth = 240;


export const WeatherLayout = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <Grid container sx={{backgroundColor:"rgba(29, 159, 253, 1)"}}>
      <Grid item xs={12} sx={{ backgroundColor:"rgba(255,255,255)", display:"flex", padding:"30px", margin:"20px", width:"95%", borderRadius:"1%"}} className='animate__animated animate__fadeIn animate__faster' >

        <ResponsiveNavBar />

        <ResponsiveDrawer 
          drawerWidth={drawerWidth} 
          onCityChange={handleCityChange}
          sx={{ flex: 1, minWidth: "60%" }}
          />
        {/* Sidebar drawerWidth*/}

        <Box component='main' sx={{ flex: 1, minWidth: "30%" }}>
          <WeeklyForecast selectedCity={selectedCity} />
          <Typography variant="h5"> {selectedCity}</Typography>
        </Box>


      </Grid>
    </Grid>
  )
}
