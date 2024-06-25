import AppRouter from "./router/AppRouter"; // Importa como default export
import { AppTheme } from "./themes/AppTheme";

export const WeatherApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
