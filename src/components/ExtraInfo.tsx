import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ExtraInfo = ({value, label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label_value}>{value}</Text>
      <Text style={styles.label_extra}>{label}</Text>
    </View>
  );
};

const ExtraInfoSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  label_extra: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Poppins_300Light',
  },
  label_value: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
  },
  separator: {
    width: 1,
    backgroundColor: '#FFFFFF77',
  },
});

export {ExtraInfo, ExtraInfoSeparator};
