// useAuthGuard.ts
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { loadSession } from "./authSlice";

const useAuthGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadSession()); // Cargar sesión al montar el componente

    const publicPaths = ["/auth/login", "/auth/register"];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (status === "authenticated" && isPublicPath) {
      navigate("/");
    } else if (
      status !== "authenticated" &&
      !isPublicPath &&
      location.pathname !== "/auth/login"
    ) {
      navigate("/auth/login");
    }
  }, [dispatch, status, location.pathname, navigate]);
};

export default useAuthGuard;
