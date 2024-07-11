# Weather App

This is a weather application built with React Native and Expo. It allows users to search for weather information by city name.

## Features

- Search for weather by city name
- Display current weather conditions
- Show temperature in Celsius, Fahrenheit, and Kelvin
- City name suggestions as you type
- Error handling with user-friendly messages

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/NickLvovich/WeatherApp
   cd WeatherApp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```
   OPEN_WEATHER_API_KEY=your_openweather_api_key_here
   ```

## Running the App

To start the development server:

```bash
npx expo start
```

This will open the Expo DevTools in your browser. You can then run the app on:

- An Android emulator
- An iOS simulator
- Your physical device using the Expo Go app

## Testing

To run the tests:

```
npm test
```

## Project Structure

- `app/`: Contains the main application code
- `components/`: Reusable React components
- `screens/`: Main screen components
- `services/`: API services
- `utils/`: Utility functions
- `__tests__/`: Test files

## Technologies Used

- React Native
- Expo
- TypeScript
- Axios
- React Native Paper

## API Usage

This app uses the OpenWeather API for fetching weather data. Make sure you have a valid API key and add it to your `.env` file.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

## License

This project is licensed under the MIT License.
