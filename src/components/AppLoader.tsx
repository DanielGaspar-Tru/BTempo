import React from 'react';

import {StyleSheet, View} from 'react-native';

const AppLoader = () => {
  return <View style={styles.appLoader} />;
};

const styles = StyleSheet.create({
  appLoader: {
    backgroundColor: 'black',
  },
});

export default AppLoader;
