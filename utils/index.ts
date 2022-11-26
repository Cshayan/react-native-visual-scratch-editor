import {Dimensions} from 'react-native';

export const getDeviceHeight = (): number => {
  return Dimensions.get('screen').height;
};

export const getDeviceWidth = (): number => {
  return Dimensions.get('screen').width;
};
