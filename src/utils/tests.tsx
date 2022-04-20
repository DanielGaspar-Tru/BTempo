import React from 'react';
import {LocationProvider} from '../context/location';
import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';

export const wrapper: React.FC = ({children}) => (
  <NavigationContainer>
    <LocationProvider>{children}</LocationProvider>
  </NavigationContainer>
);

export const renderWithWrapper = component => {
  return render(component, {wrapper});
};
