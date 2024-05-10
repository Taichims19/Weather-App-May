import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./themes/AppTheme";

export const WeatherApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
