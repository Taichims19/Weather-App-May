import { Navigate, Route, Routes } from "react-router-dom";

import { WeatherPage } from "../pages/WeatherPage";

export const WeatherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WeatherPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
