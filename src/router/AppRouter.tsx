import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";

import { WeatherRoutes } from "../weather/routes/WeatherRoutes";
// import { CheckingAuth } from '../ui';
// import { useCheckAuth } from '../hooks';

export const AppRouter = () => {
  // const { status } = useCheckAuth();

  // if (status === 'checking') {
  //   return <CheckingAuth />
  // }

  return (
    <Routes>
      {/* {
        (status === 'authenticated')
          ? <Route path="/*" element={<Wea />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      } */}

      {/* <Route path='/*' element={<Navigate to='/auth/login' />} /> */}

      {/* Login y registro */}
      <Route path='/auth/*' element={<AuthRoutes />} />

      {/* WeatherApp */}
      <Route path='/*' element={<WeatherRoutes />} />
    </Routes>
  );
};
