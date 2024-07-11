import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { searchCity } from '@/services/cityService';

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

interface WeatherState {
  weather: WeatherData | null;
  loading: boolean;
  error: string;
}

interface WeatherData {
  weather: { description: string }[];
  main: { temp: number };
  [key: string]: any; // для других данных, которые могут быть в ответе API
}

export const fetchWeather = createAsyncThunk<
  WeatherData,
  string,
  { rejectValue: { message: string } }
>('weather/fetchWeather', async (city: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      const suggestedCities = await searchCity(city);
      if (suggestedCities.length > 0) {
        return rejectWithValue({ message: `Did you mean ${suggestedCities.join(', ')}?` });
      } else {
        return rejectWithValue({ message: 'City not found' });
      }
    } else {
      return rejectWithValue({ message: 'Error fetching data' });
    }
  }
});

const initialState: WeatherState = {
  weather: null,
  loading: false,
  error: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.weather = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action: PayloadAction<{ message: string }>) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default weatherSlice.reducer;
