import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const PrivateRoute: React.FC = ({ children, ...rest }) => {
  const { status } = useSelector((state: RootState) => state.auth);
  return status === "authenticated" ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
