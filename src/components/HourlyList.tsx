import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import HourlyItem from './HourlyItem';

const HourlyList = ({data}) => {
  const renderHourlyData = (item, index) => {
    return <HourlyItem item={item} index={index} />;
  };

  const Separator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <FlatList
      data={data.slice(0, Math.min(data.length, 24))}
      renderItem={({item, index}) => renderHourlyData(item, index)}
      keyExtractor={item => item.dt}
      horizontal={true}
      contentContainerStyle={styles.hourlyListContentContainer}
      style={styles.hourlyList}
      ItemSeparatorComponent={Separator}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  hourlyListContentContainer: {
    height: 80,
    paddingHorizontal: 24,
    flexGrow: 0,
    marginBottom: 8,
  },
  hourlyList: {
    flexGrow: 0,
  },
  separator: {
    width: 8,
  },
});

export default HourlyList;
