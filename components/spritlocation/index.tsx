import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../Text';

interface ISpritLocation {
  x: number;
  y: number;
}

const SprintLocation = ({x, y}: ISpritLocation): JSX.Element => {
  return (
    <View style={styles.row}>
      <View style={styles.row}>
        <Text>X: </Text>
        <View>
          <Text>{x}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text>Y: </Text>
        <View>
          <Text>{y}</Text>
        </View>
      </View>
    </View>
  );
};

export default SprintLocation;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
