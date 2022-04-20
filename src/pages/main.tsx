import React from 'react';
import {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  BounceIn,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {useLocationContext} from '../context/location';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {WEATHER_COLORS, WEATHER_IMAGES} from '../constants/Conditions';
import {formatTemp} from '../utils';
import {useWeather} from '../hooks/useWeather';
import {
  Poppins_300Light,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';

import {
  ExtraInfo,
  ExtraInfoSeparator,
  Temperatures,
  HourlyList,
} from '../components';

const City = ({city}) => (
  <>
    <Text style={styles.label_city}>{city}</Text>
  </>
);

const MainWeather = ({data}) => {
  const {current, daily} = data;
  const todayTemp = daily[0].temp;
  const maxTemp = formatTemp(todayTemp.max);
  const minTemp = formatTemp(todayTemp.min);

  const weatherImage =
    WEATHER_IMAGES[current?.weather[0]?.icon || WEATHER_IMAGES['01n']];

  return (
    <>
      <Text style={styles.label_temperature} testID="temperature">
        {formatTemp(current.temp)}
      </Text>
      <View style={styles.mainIconContainer}>
        <Animated.Image
          entering={BounceIn.duration(500).delay(200)}
          style={styles.mainIcon}
          source={weatherImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.label_description}>
        {current.weather[0]?.description}
      </Text>
      <Animated.View style={styles.minMaxContainer} entering={FadeInLeft}>
        <Temperatures temp={maxTemp} max={true} />
        <Temperatures temp={minTemp} max={false} />
      </Animated.View>
      <Animated.View entering={FadeInRight} style={styles.extraInfoContainer}>
        <ExtraInfo label="Umidade" value={`${Math.round(current.humidity)}%`} />
        <ExtraInfoSeparator />
        <ExtraInfo label="Índice UV" value={Math.round(current.uvi)} />
        <ExtraInfoSeparator />
        <ExtraInfo
          label="Prob. Chuva"
          value={daily[0]?.pop ? `${Math.round(daily[0].pop * 100)}%` : '0%'}
        />
      </Animated.View>
    </>
  );
};

const Background = ({currentWeather}) => {
  const backgroundColor = currentWeather?.weather[0]?.icon
    ? WEATHER_COLORS[currentWeather?.weather[0]?.icon]
    : ['#000000', '#000000'];
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={backgroundColor}
      style={styles.background}
    />
  );
};

const Error: React.FC = () => {
  return (
    <View style={styles.mainIconContainer}>
      <Image
        style={styles.mainIcon}
        source={WEATHER_IMAGES.error}
        resizeMode="contain"
      />
      <Text style={styles.label_error} testID="error-message">
        Não foi possível carregar a previsão do tempo, por favor cheque sua
        conexão e tente novamente.
      </Text>
    </View>
  );
};

const Loading: React.FC = () => {
  return (
    <View>
      <ActivityIndicator
        animating={true}
        hidesWhenStopped={true}
        size="small"
        color="#ffffff"
        testID="loading"
      />
    </View>
  );
};

const Container: React.FC = ({children, onRefresh}) => {
  const {location} = useLocationContext();
  const [weatherData, loading] = useWeather(location);

  const tapRefresh = () => {
    if (loading) {
      return;
    }
    onRefresh(location);
  };

  const refreshData = () => {
    onRefresh(location);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background currentWeather={weatherData?.current} />
      {weatherData && !loading && (
        <TouchableOpacity onPress={tapRefresh} style={styles.buttonRefresh}>
          <Ionicons name="refresh-outline" size={24} color="white" />
        </TouchableOpacity>
      )}
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['transparent']}
            progressBackgroundColor="transparent"
            refreshing={loading}
            onRefresh={refreshData}
            style={styles.refreshControl}
          />
        }>
        <City city={location.city} />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const WeatherContent: React.FC = ({weatherData}) => {
  return (
    <>
      <Animated.View entering={FadeInDown} style={styles.weatherContainer}>
        {weatherData && (
          <MainWeather data={weatherData} style={styles.weatherContainer} />
        )}
      </Animated.View>
      {weatherData && <HourlyList data={weatherData?.hourly} />}
    </>
  );
};

const Main: React.FC = () => {
  const {location} = useLocationContext();
  const [weatherData, loading, errorMessage, getData] = useWeather(location);
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <Container onRefresh={getData}>
      {errorMessage ? (
        <Error />
      ) : loading ? (
        <Loading />
      ) : (
        <WeatherContent weatherData={weatherData} />
      )}
    </Container>
  );
};

export {Main};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollview: {
    flex: 1,
  },
  refreshControl: {
    opacity: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
  scrollviewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    backgroundColor: '#B082E4',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    height: '100%',
  },
  label_city: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Poppins_300Light',
  },

  weatherContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Main
  label_description: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    textTransform: 'capitalize',
  },
  label_temperature: {
    fontSize: 104,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    paddingLeft: 24,
    marginTop: Platform.OS === 'ios' ? 0 : -20,
    marginBottom: Platform.OS === 'ios' ? 0 : -20,
    alignItems: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 130,
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
  label_error: {
    fontSize: 13,
    marginTop: 8,
    color: 'white',
    fontFamily: 'Poppins_300Light',
    textAlign: 'center',
  },
  minMaxContainer: {
    flexDirection: 'row',
    width: 128,
    justifyContent: 'space-between',
    marginTop: 16,
  },
  extraInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 48,
  },
  buttonRefresh: {
    position: 'absolute',
    right: 32,
    top: 54,
    zIndex: 990,
  },
});
