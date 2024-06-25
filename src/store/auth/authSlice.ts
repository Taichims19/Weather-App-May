import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  displayName: string | null;
  errorMessage: string | null;
  status: "authenticated" | "not_authenticated" | "checking";
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  displayName: null,
  errorMessage: null,
  status: "not_authenticated", // Iniciamos con estado de "verificando" al cargar la app
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ email: string; displayName: string }>
    ) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.errorMessage = null;
      state.status = "authenticated";
      localStorage.setItem("auth", JSON.stringify(state)); // Guardar en localStorage
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.displayName = null;
      state.errorMessage = null;
      state.status = "not_authenticated";
      localStorage.removeItem("auth"); // Eliminar de localStorage
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ email: string; displayName: string }>
    ) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.errorMessage = null;
      state.status = "authenticated";
      localStorage.setItem("auth", JSON.stringify(state)); // Guardar en localStorage
    },
    loadSession: (state) => {
      const storedState = localStorage.getItem("auth");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        state.isAuthenticated = parsedState.isAuthenticated;
        state.email = parsedState.email;
        state.displayName = parsedState.displayName;
        state.errorMessage = parsedState.errorMessage;
        state.status = parsedState.status;
      } else {
        state.status = "not_authenticated";
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  loadSession,
  setError,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
