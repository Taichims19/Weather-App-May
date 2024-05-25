import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const colorsTheme = createTheme({
  palette: {
    primary: {
      // Usando RGBA donde los valores de R, G, B son 38, 34, y 84 y la opacidad es 1 (100%)
      main: 'rgba(29, 158, 250,1)',
    },
    secondary: {
      // Similar, para el color secundario
      main: 'rgba(84, 56, 132, 1)',
    },
    error: {
      // Para el color de error, puedes seguir usando el color predefinido de MUI o definir uno personalizado
      main: red.A400, // Asumiendo que quieres mantener este color de MUI
      // O definir un color RGBA personalizado
      // main: 'rgba(255, 0, 0, 0.6)',  // Rojo con un 60% de opacidad
    },
  },
});
