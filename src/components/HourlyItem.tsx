import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {formatHour, formatTemp} from '../utils';
import {WEATHER_IMAGES} from '../constants/Conditions';
import {FadeInDown} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const HourlyItem = ({item, index}) => {
  const hour = formatHour(item.dt);
  const weatherImage =
    WEATHER_IMAGES[item.weather[0]?.icon || WEATHER_IMAGES['01n']];

  const temp = formatTemp(item.temp);
  return (
    <Animated.View
      style={styles.hourlyItemContainer}
      entering={FadeInDown.duration(400).delay(index * 100)}>
      <Text style={styles.label_hourlyTime}>{hour}</Text>
      <View style={styles.hourlyIconContainer}>
        <Image
          source={weatherImage}
          style={styles.hourlyIcon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.label_hourlyTemp}>{temp}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  hourlyItemContainer: {
    width: 48,
    borderRadius: 8,
    backgroundColor: '#00000055',
    height: '100%',
    alignItems: 'center',
    padding: 4,
  },
  hourlyIconContainer: {
    width: 32,
    height: 32,
    padding: 4,
  },
  hourlyIcon: {
    width: '100%',
    height: '100%',
  },
  label_hourlyTime: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'normal',
  },
  label_hourlyTemp: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
    marginLeft: 4,
  },
});

export default HourlyItem;
