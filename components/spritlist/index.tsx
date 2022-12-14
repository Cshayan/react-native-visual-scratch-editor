import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComp from '../Text';
import {ISpritItem} from '../../constants';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

interface ISpritList {
  list: ISpritItem[];
  setList: React.Dispatch<React.SetStateAction<ISpritItem[]>>;
}

interface ParamList extends ParamListBase {
  Editor: {
    actionToExecute: number;
    spritID: number;
  };
}

const SpritList = ({list, setList}: ISpritList): JSX.Element => {
  const navigation = useNavigation<any>();
  const {params: {actionToExecute = 0, spritID = -1} = {}} =
    useRoute<RouteProp<ParamList, 'Editor'>>();

  const handlePlusClick = (spritItem: ISpritItem): void => {
    const templist = [...list];
    let updatedSpritItem: ISpritItem = {
      id: 1,
      name: '',
      source: 0,
      show: false,
      default: 0,
    };

    updatedSpritItem = templist.find(i => i.id === spritItem.id) as ISpritItem;
    updatedSpritItem.show = true;

    const oldSpritItemIndex = templist?.findIndex(
      i => i.id === updatedSpritItem.id,
    );
    templist[oldSpritItemIndex] = updatedSpritItem;

    setList(templist);
  };

  const onAddActionClick = (spritItem: ISpritItem): void => {
    navigation.navigate('ActionCreator', {spritID: spritItem.id});
  };

  return (
    <View style={styles.container}>
      {list.map(sprit => (
        <TouchableOpacity
          key={sprit.id}
          style={styles.listCard}
          onPress={() => handlePlusClick(sprit)}>
          <Image
            source={sprit.show ? sprit.source : sprit.default}
            style={styles.image}
            resizeMode="contain"
          />
          {actionToExecute !== 0 && sprit.show && sprit.id === spritID && (
            <View style={styles.actionOverlay}>
              <TextComp size={12} color="#fff" style={styles.centerText}>
                Action {actionToExecute}
              </TextComp>
            </View>
          )}
          {sprit.show && (
            <TouchableOpacity
              style={styles.addActionCTA}
              onPress={() => onAddActionClick(sprit)}>
              <TextComp size={16} color="#fff">
                Add Action
              </TextComp>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SpritList;

const styles = StyleSheet.create({
  listCard: {
    marginHorizontal: 10,
    borderColor: '#2596be',
    borderWidth: 1,
    // padding: 5,
    borderRadius: 8,
  },
  container: {
    flexDirection: 'row',
    marginTop: 30,
  },
  image: {
    height: 80,
    aspectRatio: 1,
    marginHorizontal: 10,
  },
  addActionCTA: {
    backgroundColor: '#2596be',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionOverlay: {
    backgroundColor: 'green',
    position: 'absolute',
    width: '100%',
  },
  centerText: {
    textAlign: 'center',
  },
});
