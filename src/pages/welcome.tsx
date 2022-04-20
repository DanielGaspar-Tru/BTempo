import React from 'react';

import {SafeAreaView, Image, StyleSheet, Text, View} from 'react-native';

import {useLocationContext} from '../context/location';
import * as Location from 'expo-location';
import {WEATHER_IMAGES} from '../constants/Conditions';
import {Button} from '../components';

const Welcome: React.FC = () => {
  const {permissionStatus, setPermissionStatus, setLocation, getLocation} =
    useLocationContext();

  const UNDETERMINED =
    permissionStatus?.status === Location.PermissionStatus.UNDETERMINED;

  const getPermission = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.status === Location.PermissionStatus.GRANTED) {
      getLocation();
    } else {
      setPermissionStatus(permission);
    }
  };

  const proceed = () => {
    setLocation({
      latitude: -23.6821604,
      longitude: -46.8754911,
      city: 'São Paulo',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mainIconContainer}>
          <Image
            style={styles.mainIcon}
            source={WEATHER_IMAGES[UNDETERMINED ? '02d' : 'error']}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.label_title} testID="welcome-text">
          {UNDETERMINED
            ? 'Bem vindo, saiba sobre o tempo na sua cidade.'
            : 'Permissão de localização negada.'}
        </Text>
        <Text style={styles.label_subtitle}>
          Para o funcionamento correto do app é necessário obter sua
          localização.
          {!UNDETERMINED &&
            '\nAcesse as configurações do dispositivo e permita o acesso do app à sua localização.'}
        </Text>

        {UNDETERMINED ? (
          <Button
            title="Solicitar permissão"
            onPress={getPermission}
            testID="button-action-ask"
          />
        ) : (
          <Button
            title="Ok, entendi"
            onPress={proceed}
            testID="button-action-ack"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export {Welcome};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mainIconContainer: {
    width: 200,
    height: 160,
    paddingBottom: 16,
  },
  mainIcon: {
    width: '100%',
    height: '100%',
  },
  label_title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    textAlign: 'center',
    marginTop: 24,
  },
  label_subtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_300Light',
    color: 'white',
    textAlign: 'center',
    marginTop: 16,
  },
});
