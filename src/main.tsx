import React from 'react';
import ReactDOM from 'react-dom/client';
import { WeatherApp } from './WeatherApp';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <WeatherApp />
      </BrowserRouter>

    </Provider>
  </React.StrictMode>,
)
