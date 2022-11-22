/* eslint-disable react-hooks/exhaustive-deps */
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import React, {forwardRef, ForwardRefRenderFunction} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import TextComp from '../../Text';
import {useDraggableSprit} from './hooks';
import Animated from 'react-native-reanimated';

export interface DraggableSpritHandler {
  resetXYCoordinates: () => void;
}

interface IDraggableSprit {
  source: ImageSourcePropType;
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
}

const DraggableSprit: ForwardRefRenderFunction<
  DraggableSpritHandler,
  IDraggableSprit
> = ({source, setX, setY}, forwardedRef): JSX.Element => {
  const {onPanGestureEvent, draggableRStyle, sayHello} = useDraggableSprit({
    setX,
    setY,
    forwardedRef,
  });

  return (
    <PanGestureHandler onGestureEvent={onPanGestureEvent}>
      <Animated.View style={[draggableRStyle]}>
        {!!sayHello && (
          <View style={styles.helloBox}>
            <TextComp color="#fff">Hello</TextComp>
          </View>
        )}
        <Image source={source} style={styles.image} resizeMode="contain" />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default forwardRef(DraggableSprit);

const styles = StyleSheet.create({
  image: {
    height: 50,
    aspectRatio: 1,
  },
  helloBox: {
    backgroundColor: '#2596be',
    width: 50,
    padding: 5,
    borderRadius: 8,
  },
});
