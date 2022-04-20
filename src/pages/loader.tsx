import React, {useEffect} from 'react';
import {useLocationContext} from '../context/location';

import {SafeAreaView, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const Loader: React.FC = () => {
  const {animationFinished} = useLocationContext();

  useEffect(() => {
    setTimeout(() => {
      animationFinished();
    }, 2000);
  }, [animationFinished]);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('../images/animation/logo.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.appTitle}>Builders Tempo</Text>
    </SafeAreaView>
  );
};

export {Loader};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  lottie: {
    height: 140,
  },
  appTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    marginTop: 24,
  },
});
