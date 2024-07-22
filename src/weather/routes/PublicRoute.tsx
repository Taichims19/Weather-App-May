import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const PublicRoute: React.FC = ({ children }) => {
  const { status } = useSelector((state: RootState) => state.auth);

  return status === "authenticated" ? <Navigate to="/" /> : children;
};

export default PublicRoute;
