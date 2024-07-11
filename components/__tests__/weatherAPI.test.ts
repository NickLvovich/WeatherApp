import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchWeather } from '@/reduxStore/slices/weatherSlice';
import store from '../../reduxStore/store';

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY

describe('Weather API Integration Tests', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('fetches weather successfully from API', async () => {
    const city = 'London';
    const response = {
      weather: [{ description: 'clear sky' }],
      main: { temp: 280.32 }
    };

    mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`).reply(200, response);

    const result = await store.dispatch(fetchWeather(city));
    const weatherState = store.getState().weather;
    expect(result.type).toBe('weather/fetchWeather/fulfilled');
    expect(weatherState.weather).toEqual(response);
    expect(weatherState.error).toBe('');
  });

  it('handles error when city is not found', async () => {
    const city = 'dawdawdawas';
    const errorMessage = 'City not found';

    mock.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`).reply(404, {
      message: errorMessage
    });

    const result = await store.dispatch(fetchWeather(city));
    const weatherState = store.getState().weather;
    expect(result.type).toBe('weather/fetchWeather/rejected');
    expect(weatherState.weather).toBe(null);
    expect(weatherState.error).toBe(errorMessage);
  });
});