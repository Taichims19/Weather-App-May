import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { colorsTheme } from './colorsTheme';


export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={colorsTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
