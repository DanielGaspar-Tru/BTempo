import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({onPress, title, testID}: {onPress: void; title: string}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.button} testID={testID}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFCC02',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: '100%',
    bottom: 32,
    position: 'absolute',
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
  },
});

export default Button;
