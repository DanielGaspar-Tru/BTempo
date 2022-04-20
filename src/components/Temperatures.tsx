import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const Temperature = ({temp, max}) => {
  const imageSource = max
    ? require('../images/maxTemp.png')
    : require('../images/minTemp.png');
  return (
    <View style={styles.container}>
      <Image source={imageSource} resizeMode="contain" />
      <Text style={styles.label_temperature}>{temp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label_temperature: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Temperature;
