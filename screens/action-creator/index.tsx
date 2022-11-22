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

  const [currentActionList, setCurrentActionList] = useState<IAction[]>([
    {id: 0, title: ''},
  ]);

  const onDonePress = (): void => {
    const filteredCurrentList = currentActionList?.filter(
      list => !!list?.title,
    );
    navigation.navigate('Editor', {
      animationList: filteredCurrentList,
      spritID,
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.row}>
        <ActionCodeList
          allActionList={ACTION_LIST}
          setCurrentActionList={setCurrentActionList}
          currentActionList={currentActionList}
        />
        <CurrentActionList />
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
