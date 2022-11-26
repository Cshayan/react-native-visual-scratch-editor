import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComp from '../Text';
import {getDeviceWidth} from '../../utils';

interface ICurrentActionList {
  isActionOneActive: boolean;
  onActionOnePress: () => void;
  onActionTwoPress: () => void;
}

const CurrentActionList = ({
  isActionOneActive,
  onActionOnePress,
  onActionTwoPress,
}: ICurrentActionList): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={onActionOnePress}
          style={isActionOneActive ? styles.activeTab : styles.inActiveTab}>
          <TextComp color="#fff">ACTION1</TextComp>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onActionTwoPress}
          style={!isActionOneActive ? styles.activeTab : styles.inActiveTab}>
          <TextComp color="#111">ACTION2</TextComp>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CurrentActionList;

const styles = StyleSheet.create({
  container: {
    width: getDeviceWidth(),
    position: 'absolute',
    bottom: 100,
    right: 0,
    left: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  activeTab: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 26,
  },
  inActiveTab: {
    backgroundColor: 'grey',
    paddingVertical: 5,
    paddingHorizontal: 26,
  },
});
