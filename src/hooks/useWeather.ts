import {useState, useEffect, useCallback} from 'react';

import {WeatherOneCallResponse} from '../@types/weather';
import api from '../services/api';
import {mockOneCall, setTimeoutAsync} from '../../__mocks__/';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export function useWeather(location?: Coordinates): WeatherOneCallResponse {
  const [weatherData, setWeatherData] = useState<WeatherOneCallResponse>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getData = useCallback(async () => {
    if (!location) {
      return;
    }
    try {
      setLoading(true);
      const response = await api.get<WeatherOneCallResponse>(
        `onecall?lat=${location.latitude}&lon=${location.longitude}`,
      );

      // const response = {data: await setTimeoutAsync(mockOneCall, 2000)};
      setLoading(false);
      if (response && response.data) {
        setWeatherData(response.data);
        setErrorMessage(null);
      } else {
        throw 'No response from server';
      }
    } catch (error: any) {
      setLoading(false);
      let message = 'Unknown Error';
      if (error instanceof Error) {
        message = error.message;
      }
      setErrorMessage(message);
    }
  }, [location]);

  useEffect(() => {
    getData();
  }, [getData]);

  return [weatherData, loading, errorMessage, getData];
}
