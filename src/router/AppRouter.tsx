import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { WeatherRoutes } from "../weather/routes/WeatherRoutes";
import PrivateRoute from "../auth/routes/PrivateRoute";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import PublicRoute from "../weather/routes/PublicRoute";
import useAuthGuard from "../store/auth/useAuthGuard";

const AppRouter = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  useAuthGuard();

  return (
    <Routes>
      <Route path="/" element={<WeatherRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* {status === "authenticated" ? (
        <>
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <WeatherRoutes />
              </PrivateRoute>
            }
          />
          <Route path="/auth/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route
            path="/auth/*"
            element={
              <PublicRoute>
                <AuthRoutes />
              </PublicRoute>
            }
          />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )} */}
    </Routes>
  );
};

export default AppRouter; // Asegúrate de exportar AppRouter como default
