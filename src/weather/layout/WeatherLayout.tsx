import { Box, Grid, Typography } from "@mui/material";
import { ResponsiveNavBar } from "../components/NavBar";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import WeeklyForecast from "../components/WeeklyForecast";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

// const drawerWidth = 240;

export const WeatherLayout = () => {
  const { city } = useSelector((state: RootState) => state.weather);
  return (
    <Grid container sx={{ backgroundColor: "rgba(29, 159, 253, 1)" }}>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "rgba(255,255,255)",
          display: "flex",
          padding: "30px",
          margin: "40px",
          width: "95%",
          marginRight: "5%",
          borderRadius: "1%",
        }}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <ResponsiveNavBar />

        <ResponsiveDrawer sx={{ flex: 1, minWidth: "60%" }} />
        {/* Sidebar drawerWidth*/}

        <Box
          component="main"
          sx={{ flex: 1, minWidth: "30%", height: "92.5%" }}
        >
          <WeeklyForecast />
          {/* <Typography variant="h5">
            <strong>Clima Actual en {city}</strong>
          </Typography> */}
        </Box>
      </Grid>
    </Grid>
  );
};
