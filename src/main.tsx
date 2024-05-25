import * as React from "react";
import ReactDOM from "react-dom/client";
import { WeatherApp } from "./WeatherApp";
import "./styles.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <WeatherApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
