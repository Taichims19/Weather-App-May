import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '86799fe9255e40e3b0bf260daa082854'; // Asegúrate de usar tu propia API Key

export const fetchGeolocation = createAsyncThunk(
  'geolocation/fetchGeolocation',
  async (_, { rejectWithValue }) => {
    if (!('geolocation' in navigator)) {
      return rejectWithValue('Geolocation not supported');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        maximumAge: 0,
        timeout: 10000,
        enableHighAccuracy: true,
      });
    })
      .then(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
          );
          const city =
            response.data.results[0].components.city ||
            response.data.results[0].components.town ||
            '';
          return { lat: latitude, lon: longitude, city };
        } catch (error) {
          throw rejectWithValue('Failed to fetch city name from coordinates');
        }
      })
      .catch((error) => {
        throw rejectWithValue(error.message || 'Failed to get geolocation');
      });
  }
);

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState: {
    coordinates: { lat: null, lon: null },
    city: '',
    loaded: false,
    error: null,
  },
  reducers: {
    refreshGeolocation(state) {
      state.loaded = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeolocation.pending, (state) => {
        state.loaded = false;
        state.error = null;
      })
      .addCase(fetchGeolocation.fulfilled, (state, action) => {
        state.coordinates = {
          lat: action.payload.lat,
          lon: action.payload.lon,
        };
        state.city = action.payload.city;
        state.loaded = true;
      })
      .addCase(fetchGeolocation.rejected, (state, action) => {
        state.error = action.payload;
        state.loaded = true;
      });
  },
});

export const { refreshGeolocation } = geolocationSlice.actions;
export default geolocationSlice.reducer;
