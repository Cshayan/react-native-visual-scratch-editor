import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import reset from '../../../assets/images/reset.png';

interface IResetButton {
  onPress: () => void;
}

const ResetButton = ({onPress}: IResetButton): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={reset} style={styles.resetBtn} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export default ResetButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
  },
  resetBtn: {
    height: 40,
    aspectRatio: 1,
  },
});
