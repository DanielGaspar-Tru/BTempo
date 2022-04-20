import React from 'react';
import {waitFor, fireEvent, act} from '@testing-library/react-native';
import {Welcome} from '../../src/pages';

import * as Location from 'expo-location';
import {mocked} from 'ts-jest/utils';
import {
  permissionGranted,
  permissionUndetermined,
  permissionDenied,
} from '../../__mocks__';
import {renderWithWrapper} from '../../src/utils/tests';

import {getForegroundPermissionsAsync} from 'expo-location';

describe('Pages -> Welcome Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should show UI for permission.status = Denied', async () => {
    const getForegroundPermissionsAsyncMocked = mocked(
      getForegroundPermissionsAsync,
    );
    getForegroundPermissionsAsyncMocked.mockResolvedValue(permissionDenied);

    const {getByText, getByTestId} = renderWithWrapper(<Welcome />);

    const button = await waitFor(() => getByTestId('button-action-ack'));
    expect(button).toBeTruthy();

    const welcomeText = await waitFor(() =>
      getByText('Permissão de localização negada.', {exact: false}),
    );
    expect(welcomeText).toBeTruthy();
  });

  it('Should show UI for permission.status = Undetermined', async () => {
    const getForegroundPermissionsAsyncMocked = mocked(
      getForegroundPermissionsAsync,
    );

    getForegroundPermissionsAsyncMocked.mockResolvedValue(
      permissionUndetermined,
    );

    const {getByText, getByTestId} = renderWithWrapper(<Welcome />);

    const welcomeText = await waitFor(() =>
      getByText('Bem vindo, saiba sobre o tempo na sua cidade.', {
        exact: false,
      }),
    );

    expect(welcomeText).toBeTruthy();

    const button = await waitFor(() => getByTestId('button-action-ask'));
    expect(button).toBeTruthy();
  });

  it('Should request and deny location permission', async () => {
    const getForegroundPermissionsAsyncMocked = mocked(
      getForegroundPermissionsAsync,
    );

    getForegroundPermissionsAsyncMocked.mockResolvedValue(
      permissionUndetermined,
    );

    const {getByText, getByTestId} = renderWithWrapper(<Welcome />);

    const button = await waitFor(() => getByTestId('button-action-ask'));
    expect(button).toBeTruthy();

    const requestForegroundPermissionsAsyncMock = jest
      .fn()
      .mockResolvedValue(permissionDenied);

    jest
      .spyOn(Location, 'requestForegroundPermissionsAsync')
      .mockImplementation(async () => {
        return await requestForegroundPermissionsAsyncMock();
      });

    await act(async () => fireEvent.press(button));

    expect(requestForegroundPermissionsAsyncMock).toHaveBeenCalledTimes(1);

    const welcomeText = await waitFor(() =>
      getByText('Permissão de localização negada.', {exact: false}),
    );
    expect(welcomeText).toBeTruthy();
  });

  it('Should request and get location', async () => {
    const getForegroundPermissionsAsyncMocked = mocked(
      getForegroundPermissionsAsync,
    );

    getForegroundPermissionsAsyncMocked.mockResolvedValue(
      permissionUndetermined,
    );

    const {getByTestId} = renderWithWrapper(<Welcome />);

    const button = await waitFor(() => getByTestId('button-action-ask'));
    expect(button).toBeTruthy();

    const requestForegroundPermissionsAsyncMock = jest
      .fn()
      .mockResolvedValue(permissionGranted);

    jest
      .spyOn(Location, 'requestForegroundPermissionsAsync')
      .mockImplementation(async () => {
        return await requestForegroundPermissionsAsyncMock();
      });

    jest
      .spyOn(Location, 'getForegroundPermissionsAsync')
      .mockResolvedValue(permissionGranted);

    await act(async () => fireEvent.press(button));

    expect(requestForegroundPermissionsAsyncMock).toHaveBeenCalledTimes(1);
  });
});
