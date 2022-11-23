import {StyleSheet, View} from 'react-native';
import React, {Fragment} from 'react';
import {getDeviceHeight} from '../../utils';
import SprintLocation from '../spritlocation';
import {ISpritItem} from '../../constants';
import DraggableSprit from './draggable-sprit';
import ResetButton from './reset-button';
import PlayButton from '../play-button';
import {useEditorFunctionality} from './hooks';

export interface IEditor {
  list: ISpritItem[];
}

const Editor = ({list}: IEditor): JSX.Element => {
  const {
    x,
    y,
    setX,
    setY,
    elementsRef,
    handleResetButtonPress,
    handlePlayButtonPress,
  } = useEditorFunctionality({list});

  return (
    <>
      <View style={styles.container}>
        {list?.map((sprit, idx) => (
          <Fragment key={sprit.id}>
            {sprit.show && (
              <DraggableSprit
                ref={elementsRef?.current[idx]}
                source={sprit.source}
                setX={setX}
                setY={setY}
              />
            )}
          </Fragment>
        ))}
      </View>
      <SprintLocation x={x} y={y} />
      <ResetButton onPress={handleResetButtonPress} />
      <PlayButton onPress={handlePlayButtonPress} />
    </>
  );
};

export default Editor;

const styles = StyleSheet.create({
  parent: {
    position: 'relative',
  },
  container: {
    borderColor: '#2596be',
    borderWidth: 1,
    margin: 5,
    height: getDeviceHeight() / 2,
    backgroundColor: '#ffffff',
  },
});
