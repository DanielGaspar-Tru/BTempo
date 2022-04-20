/**
 * Builders - Desafio - Weather App
 * Criado por Daniel Gaspar
 *
 * @format
 */

import React from 'react';
import Routes from './src/routes/index';
import {LocationProvider} from './src/context/location';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {ErrorBoundary, AppLoader} from './src/components';
import {
  Poppins_300Light,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  },
};

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoader />;
  }

  return (
    <ErrorBoundary>
      <NavigationContainer theme={AppTheme}>
        <LocationProvider>
          <Routes />
        </LocationProvider>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;
