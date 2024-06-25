import React from "react"; // Importando React para usar useState
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton"; // Importación correcta
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import ListIcon from "@mui/icons-material/List";
import MapIcon from "@mui/icons-material/Map";
import TuneIcon from "@mui/icons-material/Tune";
import { LogoutOutlined } from "@mui/icons-material";
import { logoutSuccess } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const pages = [
  { label: "Weather", icon: <ThunderstormIcon /> },
  { label: "Cities", icon: <ListIcon /> },
  { label: "Maps", icon: <MapIcon /> },
  { label: "Settings", icon: <TuneIcon /> },
];

export const ResponsiveNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorElNav(event.currentTarget); // Suponiendo que quieres abrir un menú aquí
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    dispatch(logoutSuccess());
    navigate("/auth/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        width: "100px",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 6,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100px",
          marginTop: "40px",
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="primary"
          sx={{ paddingTop: "5px", marginBottom: "45px" }}
        >
          <BeachAccessIcon sx={{ fontSize: "30px" }} />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {pages.map((page) => (
            <Button
              key={page.label}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {page.icon}
              <Typography variant="caption" sx={{ mt: 1, fontSize: "14px" }}>
                {page.label}
              </Typography>
            </Button>
          ))}
        </Box>
        <IconButton color="error" onClick={onLogout}>
          <LogoutOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
