import { useState, useEffect } from 'react';
import axios from 'axios';

const useGeolocationAndCity = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lon: '' },
    city: '',
    error: null,
  });

  // Agregamos un estado para controlar las actualizaciones
  const [updateCount, setUpdateCount] = useState(0);

  const getCityFromCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=86799fe9255e40e3b0bf260daa082854`
      );
      const address =
        response.data.results[0].components.city ||
        response.data.results[0].components.town;
      return address;
    } catch (error) {
      console.error('Error fetching city from coordinates:', error);
      return '';
    }
  };

  const onSuccess = async (position) => {
    console.log('Posición obtenida:', position);
    const { latitude, longitude } = position.coords;
    const city = await getCityFromCoordinates(latitude, longitude);
    setLocation({
      loaded: true,
      coordinates: { lat: latitude, lon: longitude },
      city,
      error: null,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: error.message,
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      maximumAge: 0, // No aceptar caché
      timeout: 10000, // Tiempo de espera después de 10 segundos
      enableHighAccuracy: true, // Solicitar la mejor precisión posible
    });
  }, [updateCount]); // Se ejecutará de nuevo cuando 'updateCount' cambie

  // Función para actualizar la ubicación
  const refreshLocation = () => {
    console.log('Actualizando ubicación');
    setUpdateCount((prevCount) => prevCount + 1);
  };

  return { ...location, refreshLocation }; // Extendemos el objeto de retorno para incluir 'refreshLocation'
};

export default useGeolocationAndCity;
