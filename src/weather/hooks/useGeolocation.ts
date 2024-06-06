import { useState, useEffect } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";

interface Location {
  loaded: boolean;
  coordinates: { lat: number; lon: number };
  city: string | null;
  error: string | null;
}

const useGeolocationAndCity = () => {
  const [location, setLocation] = useState<Location>({
    loaded: false,
    coordinates: { lat: 0, lon: 0 },
    city: null,
    error: null,
  });
  // Agregamos un estado para controlar las actualizaciones
  const [updateCount, setUpdateCount] = useState(0);

  // const dispatch = useDispatch(); // Inicializa useDispatch

  const getCityFromCoordinates = async (lat: any, lon: any) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=86799fe9255e40e3b0bf260daa082854`
      );
      const address =
        response.data.results[0].components.city ||
        response.data.results[0].components.town;
      return address;
    } catch (error) {
      console.error("Error fetching city from coordinates:", error);
      return "";
    }
  };

  const onSuccess = async (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    console.log("Posición obtenida:", position);
    const { latitude, longitude } = position.coords;
    const city = await getCityFromCoordinates(latitude, longitude);
    setLocation({
      loaded: true,
      coordinates: { lat: latitude, lon: longitude },
      city,
      error: null,
    });
  };

  const onError = (error: GeolocationPositionError | { message: string }) => {
    setLocation((prevState) => ({
      ...prevState,
      loaded: true,
      error: "message" in error ? error.message : "An unknown error occurred",
    }));
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
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
  const refreshLocation = (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      setUpdateCount((prevCount) => prevCount + 1);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const city = await getCityFromCoordinates(latitude, longitude);
            setLocation({
              loaded: true,
              coordinates: { lat: latitude, lon: longitude },
              city,
              error: null,
            });
            resolve(city);
          } catch (error) {
            setLocation((prevState) => ({
              ...prevState,
              loaded: true,
              error: "Error fetching city",
            }));
            reject("Error fetching city");
          }
        },
        (error) => {
          setLocation((prevState) => ({
            ...prevState,
            loaded: true,
            error: error.message,
          }));
          reject(error.message);
        },
        {
          maximumAge: 0,
          timeout: 10000,
          enableHighAccuracy: true,
        }
      );
    });
  };
  return { ...location, refreshLocation }; // Extendemos el objeto de retorno para incluir 'refreshLocation'
};

export default useGeolocationAndCity;
