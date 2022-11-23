import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ActionCodeList from '../../components/action-code-list';
import CurrentActionList from '../../components/current-action-list';
import TextComp from '../../components/Text';
import {ACTION_LIST, IAction} from '../../constants';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

interface ParamList extends ParamListBase {
  ActionCreator: {
    spritID: number;
  };
}

const ActionCreator = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const {params: {spritID = 0} = {}} =
    useRoute<RouteProp<ParamList, 'ActionCreator'>>();

  const [currentActionListOne, setCurrentActionListOne] = useState<IAction[]>([
    {id: 0, title: ''},
  ]);

  const [currentActionListTwo, setCurrentActionListTwo] = useState<IAction[]>([
    {id: 0, title: ''},
  ]);

  const [isActionOneActive, setIsActionOneActive] = useState<boolean>(true);

  const onActionOnePress = (): void => {
    setIsActionOneActive(true);
  };

  const onActionTwoPress = (): void => {
    setIsActionOneActive(false);
  };

  const onDonePress = (): void => {
    const filteredCurrentListOne = currentActionListOne?.filter(
      list => !!list?.title,
    );
    const filteredCurrentListTwo = currentActionListTwo?.filter(
      list => !!list?.title,
    );
    console.log('filter', filteredCurrentListOne, filteredCurrentListTwo);
    navigation.navigate('Editor', {
      animationListOne: filteredCurrentListOne,
      animationListTwo: filteredCurrentListTwo,
      actionToExecute: isActionOneActive ? 1 : 2,
      spritID,
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.row}>
        <ActionCodeList
          allActionList={ACTION_LIST}
          setCurrentActionListOne={setCurrentActionListOne}
          currentActionListOne={currentActionListOne}
          currentActionListTwo={currentActionListTwo}
          setCurrentActionListTwo={setCurrentActionListTwo}
        />
        <CurrentActionList
          isActionOneActive={isActionOneActive}
          onActionOnePress={onActionOnePress}
          onActionTwoPress={onActionTwoPress}
        />
      </ScrollView>
      <TouchableOpacity style={styles.doneBtn} onPress={onDonePress}>
        <TextComp color="#fff" style={styles.textStyle}>
          DONE
        </TextComp>
      </TouchableOpacity>
    </>
  );
};

export default ActionCreator;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  doneBtn: {
    backgroundColor: 'green',
    width: '100%',
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
});
