import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '@/reduxStore/slices/weatherSlice';
import WeatherDisplay from '../components/WeatherDisplay';
import { RootState, AppDispatch } from '@/reduxStore/store';
import { searchCity } from '@/services/cityService';
import { Snackbar } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const WeatherScreen: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarColor, setSnackbarColor] = useState<string>('red');
  const [snackbarFontColor, setSnackbarFontColor] = useState<string>('white');

  const scale = useSharedValue(1);

  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector((state: RootState) => state.weather.weather);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  const handleFetchWeather = () => {
    Keyboard.dismiss();
    setSuggestions([]);

    scale.value = withSpring(1.5, {}, () => {
      scale.value = withSpring(1);
    });

    dispatch(fetchWeather(city)).unwrap()
      .catch((error: any) => {
        if (error.message.includes('Did you mean')) {
          setSnackbarMessage(error.message);
          setSnackbarColor('yellow');
          setSnackbarFontColor('black');
        } else {
          setSnackbarMessage('City not found');
          setSnackbarColor('red');
        }
        setSnackbarVisible(true);
      });
  };

  const handleSuggestion = (item) => {
    setCity(item);
    setSuggestions([]);
  }
  useEffect(() => {
    if (city.length > 2) {
      searchCity(city).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                handleSuggestion(item);
              }}
            >
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        <TouchableOpacity style={styles.button} onPress={handleFetchWeather}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
      </Animated.View>
      {loading && <ActivityIndicator testID="loading-indicator" size="large" color="#0000ff" />}
      {weather && <WeatherDisplay weather={weather} />}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: snackbarColor }}
      >
        <Text style={{ color: snackbarFontColor }}>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});

export default WeatherScreen;
