import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About this Project</Text>
      <Text style={styles.text}>This project is a simple weather application built with React Native and Redux Toolkit.</Text>
      <Text style={styles.text}>Technologies used:</Text>
      <Text style={styles.text}>- React Native</Text>
      <Text style={styles.text}>- Redux Toolkit</Text>
      <Text style={styles.text}>- TypeScript</Text>
      <Text style={styles.text}>- OpenWeather API</Text>
      <Text style={styles.text}>- Expo</Text>
      <Text style={styles.text}>Version: 1.0.0</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    color: '#666',
  },
});

export default AboutScreen;
