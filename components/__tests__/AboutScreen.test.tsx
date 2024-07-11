import React from 'react';
import { render } from '@testing-library/react-native';
import AboutScreen from '../../screens/AboutScreen';

describe('AboutScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<AboutScreen />);

    expect(getByText('About this Project')).toBeTruthy();
    expect(getByText('This project is a simple weather application built with React Native and Redux Toolkit.')).toBeTruthy();
    expect(getByText('Technologies used:')).toBeTruthy();
    expect(getByText('- React Native')).toBeTruthy();
    expect(getByText('- Redux Toolkit')).toBeTruthy();
    expect(getByText('- TypeScript')).toBeTruthy();
    expect(getByText('- OpenWeather API')).toBeTruthy();
    expect(getByText('- Expo')).toBeTruthy();
    expect(getByText('Version: 1.0.0')).toBeTruthy();
  });
});
