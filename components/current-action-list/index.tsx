import {StyleSheet, View} from 'react-native';
import React from 'react';
import TextComp from '../Text';
import {getDeviceWidth} from '../../utils';

const CurrentActionList = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <TextComp>ACTION</TextComp>
    </View>
  );
};

export default CurrentActionList;

const styles = StyleSheet.create({
  container: {
    width: getDeviceWidth() / 2,
    borderColor: '#111',
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
});
