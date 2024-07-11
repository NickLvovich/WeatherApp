import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherDisplay = ({ weather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.weatherText}>
        Celsius: {weather.main.temp}°C
      </Text>
      <Text style={styles.weatherText}>
        Fahrenheit: {(weather.main.temp * 9/5 + 32).toFixed(2)}°F
      </Text>
      <Text style={styles.weatherText}>
        Kelvin: {(weather.main.temp + 273.15).toFixed(2)}K
      </Text>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 20,
    marginVertical: 5,
  },
});

export default WeatherDisplay;
