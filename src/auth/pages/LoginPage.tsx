import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import {
  loginSuccess,
  loadSession,
  setError,
} from "../../store/auth/authSlice";
import { RootState } from "../../store/store"; // Asegúrate de tener el tipo correcto de RootState
import { findUserByEmail } from "../../hooks/userService";

const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { errorMessage, status } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email: formEmail, password, onInputChange } = useForm(formData);

  useEffect(() => {
    dispatch(loadSession());
    // if (status === "authenticated") {
    //   navigate("/");
    // }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      navigate("/");
    }
  }, [status]);

  // useEffect(() => {
  //   if (email) {
  //     navigate("/");
  //   }
  // }, [email, navigate]);

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const user = findUserByEmail(formEmail);

    // Aquí deberías verificar las credenciales
    if (user && user.password === password) {
      dispatch(
        loginSuccess({ email: user.email, displayName: user.displayName })
      );
    } else {
      // Puedes agregar lógica para manejar errores
      dispatch(setError("Credenciales incorrectas"));
    }
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <TextField
              label="correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={formEmail}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <TextField
              label="contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container display={!!errorMessage ? "" : "none"} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
