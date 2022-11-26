import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import TextComp from '../../components/Text';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import DragAndDrop from 'volkeno-react-native-drag-drop';
import {AppContext} from '../../context/context';

interface ParamList extends ParamListBase {
  ActionCreator: {
    spritID: number;
  };
}

const ActionCreator = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const {params: {spritID = 0} = {}} =
    useRoute<RouteProp<ParamList, 'ActionCreator'>>();

  const {state, dispatch} = useContext(AppContext);

  const onDonePress = (): void => {
    navigation.navigate('Editor');
  };

  const handleOnMaj = (allZones: any, allItems: any): void => {
    console.log('hjghg', allZones, spritID);
    const updatedAllZones = allZones.map((zone: any) => {
      const result = {
        ...zone,
        spritID,
      };
      return result;
    });

    const payload = {
      zones: updatedAllZones,
      allUpdatedActions: allItems,
    };
    dispatch({
      type: 'ADD_ACTIONS',
      payload,
    });
  };

  return (
    <>
      <DragAndDrop
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        itemKeyExtractor={item => item.id}
        zoneKeyExtractor={zone => zone.id}
        itemsInZoneDisplay="row"
        itemsDisplay="row"
        itemsNumCollumns={2}
        itemsInZoneNumCollumns={1}
        zones={state.animations}
        items={state.initialActions}
        itemsContainerStyle={styles.itemsContainerStyle}
        zonesContainerStyle={styles.zonesContainerStyle}
        onMaj={handleOnMaj}
        itemsInZoneStyle={styles.itemsInZoneStyle}
        renderItem={item => {
          return (
            <View style={styles.dragItemStyle}>
              <TextComp style={styles.dragItemTextStyle}>{item.title}</TextComp>
            </View>
          );
        }}
        renderZone={(zone, children, hover) => {
          return (
            <View
              style={{
                ...styles.dragZoneStyle,
                backgroundColor: hover ? '#E2E2E2' : '#FFF',
              }}>
              <TextComp color="grey">{zone.text}</TextComp>
              {children}
            </View>
          );
        }}
      />
      {/* <CurrentActionList
        isActionOneActive={isActionOneActive}
        onActionOnePress={onActionOnePress}
        onActionTwoPress={onActionTwoPress}
      /> */}
      <TouchableOpacity style={styles.doneBtn} onPress={onDonePress}>
        <TextComp color="#fff" size={18} style={styles.textStyle}>
          DONE
        </TextComp>
      </TouchableOpacity>
    </>
  );
};

export default ActionCreator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 20,
    paddingTop: 40,
    width: '100%',
  },
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
  itemsInZoneStyle: {
    width: 10,
  },
  itemsContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 1,
  },
  zonesContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dragItemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    backgroundColor: '#2596be',
    padding: 10,
    borderRadius: 8,
  },
  dragItemTextStyle: {
    color: '#011F3B',
    fontWeight: '700',
    textAlign: 'center',
  },
  dragZoneStyle: {
    borderColor: '#F39200',
    borderWidth: 1,
    width: '47%',
    padding: 15,
    minHeight: 130,
    marginVertical: 15,
  },
  dragZoneTextStyle: {
    position: 'absolute',
    opacity: 0.2,
    zIndex: 0,
    alignSelf: 'center',
    top: '50%',
  },
  invisibleStyle: {
    borderColor: '#fff',
    borderWidth: 1,
    width: '100%',
    padding: 15,
    minHeight: 130,
    marginVertical: 15,
  },
});
