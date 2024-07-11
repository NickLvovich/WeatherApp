import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from '@/reduxStore/store';
import WeatherScreen from '../screens/WeatherScreen';
import AboutScreen from '../screens/AboutScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Weather') {
                  iconName = 'weather-partly-cloudy';
                } else if (route.name === 'About') {
                  iconName = 'information';
                }
                return <Icon name={iconName} color={color} size={size} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {
                backgroundColor: '#f8f8f8',
                borderTopWidth: 0,
                elevation: 0,
              },
            })}
          >
            <Tab.Screen name="Weather" component={WeatherScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
