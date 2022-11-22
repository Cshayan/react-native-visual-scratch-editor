import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import play from '../../assets/images/play.png';

interface IPlayButton {
  onPress: () => void;
}

const PlayButton = ({onPress}: IPlayButton): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={play} style={styles.playBtn} />
    </TouchableOpacity>
  );
};

export default PlayButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    right: 0,
  },
  playBtn: {
    height: 60,
    aspectRatio: 1,
  },
});
