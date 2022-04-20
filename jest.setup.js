//import {jest} from '@jest/globals';
import * as Location from 'expo-location';
import {BounceIn, FadeInDown} from 'react-native-reanimated';
import Enzyme from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';

import {
  permissionGranted,
  mockCurrentPosition,
  mockReverseGeo,
} from './__mocks__';

Enzyme.configure({adapter: new Adapter()});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return {
    ...Reanimated,
    BounceIn: {duration: jest.fn()},
    FadeInDown: {duration: jest.fn()},
  };
});

jest
  .spyOn(Location, 'getForegroundPermissionsAsync')
  .mockReturnValue(permissionGranted);

jest.spyOn(BounceIn, 'duration').mockImplementation(() => {
  return {delay: jest.fn()};
});
jest.spyOn(FadeInDown, 'duration').mockImplementation(() => {
  return {delay: jest.fn()};
});

jest
  .spyOn(Location, 'getCurrentPositionAsync')
  .mockReturnValue(mockCurrentPosition);

jest.spyOn(Location, 'reverseGeocodeAsync').mockReturnValue(mockReverseGeo);
