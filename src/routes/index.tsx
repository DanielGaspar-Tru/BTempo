import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from '@/hooks/useRootNavigation';
import {RouteNames} from '../constants/RouteNames';
import {Loader, Main, Welcome} from '../pages';

import {useLocationContext} from '../context/location';
import * as Location from 'expo-location';

const Stack = createNativeStackNavigator<StackParamList>();

const Routes: React.FC = () => {
  const {animatingLoader, permissionStatus, location} = useLocationContext();

  const getRoute = () => {
    if (location && !animatingLoader) {
      return <Stack.Screen name={RouteNames.WEATHER_SCREEN} component={Main} />;
    }
    if (animatingLoader) {
      return <Stack.Screen name={RouteNames.LOADER} component={Loader} />;
    }
    if (
      permissionStatus &&
      permissionStatus.status !== Location.PermissionStatus.GRANTED
    ) {
      return (
        <Stack.Screen name={RouteNames.WELCOME_SCREEN} component={Welcome} />
      );
    }
    return <Stack.Screen name={RouteNames.LOADER} component={Loader} />;
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#000',
        },
      }}>
      {getRoute()}
    </Stack.Navigator>
  );
};

export default Routes;
