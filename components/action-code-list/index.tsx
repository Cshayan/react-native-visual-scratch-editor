import {StyleSheet, View} from 'react-native';
import React from 'react';
import TextComp from '../Text';
import {getDeviceWidth} from '../../utils';
import {IAction} from '../../constants';
import DraggableCodes from './draggable-codes';

interface IActionCodeList {
  allActionList: IAction[];
  currentActionListOne: IAction[];
  setCurrentActionListOne: React.Dispatch<React.SetStateAction<IAction[]>>;
  currentActionListTwo: IAction[];
  setCurrentActionListTwo: React.Dispatch<React.SetStateAction<IAction[]>>;
}

const ActionCodeList = ({
  allActionList,
  setCurrentActionListOne,
  currentActionListOne,
  currentActionListTwo,
  setCurrentActionListTwo,
}: IActionCodeList): JSX.Element => {
  return (
    <View style={styles.container}>
      <TextComp>CODE</TextComp>
      {allActionList.map((list, index) => (
        <DraggableCodes
          key={list.id}
          title={list.title}
          codeList={allActionList}
          index={index}
          currentActionListOne={currentActionListOne}
          setCurrentActionListOne={setCurrentActionListOne}
          currentActionListTwo={currentActionListTwo}
          setCurrentActionListTwo={setCurrentActionListTwo}
        />
      ))}
    </View>
  );
};

export default ActionCodeList;

const styles = StyleSheet.create({
  container: {
    width: getDeviceWidth() / 3.4,
    borderColor: '#111',
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
  box: {
    backgroundColor: '#2596be',
    marginVertical: 5,
    padding: 5,
    borderRadius: 5,
  },
});
