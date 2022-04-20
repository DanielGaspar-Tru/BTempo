import React from 'react';
import {waitFor} from '@testing-library/react-native';
import {Main} from '../../src/pages';
import * as UseWeather from '../../src/hooks/useWeather';
import {mockOneCall, mockLocation} from '../../__mocks__';
import * as LocationContext from '../../src/context/location';
import {renderWithWrapper} from '../../src/utils/tests';

describe('Pages -> Weather', () => {
  jest.useFakeTimers();
  afterEach(() => {
    //jest.clearAllMocks();
  });

  it('Should display error', async () => {
    jest.spyOn(LocationContext, 'useLocationContext').mockReturnValue({
      location: mockLocation,
    });

    jest
      .spyOn(UseWeather, 'useWeather')
      .mockReturnValue([
        null,
        false,
        'Error Message',
        UseWeather.getData,
      ] as UseWeather.UseWeatherResponse);

    const {getByTestId} = renderWithWrapper(<Main />);

    const errorMessage = await waitFor(() => getByTestId('error-message'));
    expect(errorMessage).toBeTruthy();
  });

  it('Should be loading', async () => {
    jest.spyOn(LocationContext, 'useLocationContext').mockReturnValue({
      location: mockLocation,
    });

    jest
      .spyOn(UseWeather, 'useWeather')
      .mockReturnValue([
        null,
        true,
        null,
        UseWeather.getData,
      ] as UseWeather.UseWeatherResponse);

    const {getByTestId} = renderWithWrapper(<Main />);

    const activityIndicator = await waitFor(() => getByTestId('loading'));
    expect(activityIndicator).toBeTruthy();
  });

  it('Should display weather info', async () => {
    jest.spyOn(LocationContext, 'useLocationContext').mockReturnValue({
      location: mockLocation,
    });

    jest
      .spyOn(UseWeather, 'useWeather')
      .mockReturnValue([
        mockOneCall,
        false,
        '',
        UseWeather.getData,
      ] as UseWeather.UseWeatherResponse);

    const {getByText, getByTestId} = renderWithWrapper(<Main />);

    const city = await waitFor(() => getByText('Votorantim'));
    expect(city).toBeTruthy();

    const temperature = await waitFor(() => getByTestId('temperature'));
    expect(temperature).toBeTruthy();

    const weatherDesc = await waitFor(() =>
      getByText('Céu Limpo', {exact: false}),
    );
    expect(weatherDesc).toBeTruthy();
  });
});
