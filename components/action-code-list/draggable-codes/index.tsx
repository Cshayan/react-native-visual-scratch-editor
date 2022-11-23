import {StyleSheet} from 'react-native';
import React from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import TextComp from '../../Text';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {IAction} from '../../../constants';

interface IDraggableCodes {
  title: string;
  codeList: IAction[];
  index: number;
  currentActionListOne: IAction[];
  setCurrentActionListOne: React.Dispatch<React.SetStateAction<IAction[]>>;
  currentActionListTwo: IAction[];
  setCurrentActionListTwo: React.Dispatch<React.SetStateAction<IAction[]>>;
}

const DraggableCodes = ({
  title,
  codeList,
  index,
  currentActionListOne,
  setCurrentActionListOne,
  currentActionListTwo,
  setCurrentActionListTwo,
}: IDraggableCodes): JSX.Element => {
  const buttonTranslateX = useSharedValue(0);
  const buttonTranslateY = useSharedValue(0);

  const onPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number; startY: number}
  >({
    onStart: (_, ctx) => {
      ctx.startX = buttonTranslateX.value;
      ctx.startY = buttonTranslateY.value;
    },
    onActive: (e, ctx) => {
      buttonTranslateX.value = ctx.startX + e.translationX;
      buttonTranslateY.value = ctx.startY + e.translationY;
    },
    onEnd: e => {
      // action! x range (translationX) -> 125 to 255
      if (e.translationX >= 120 && e.translationX <= 245) {
        // action range 1
        runOnJS(setCurrentActionListOne)([
          ...currentActionListOne,
          codeList?.[index],
        ]);
      } else if (e.translationX >= 246) {
        // action range 2
        runOnJS(setCurrentActionListTwo)([
          ...currentActionListTwo,
          codeList?.[index],
        ]);
      }
    },
  });

  const draggableRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: buttonTranslateY.value},
        {translateX: buttonTranslateX.value},
      ],
    };
  }, []);

  return (
    <PanGestureHandler onGestureEvent={onPanGestureEvent}>
      <Animated.View style={[styles.box, draggableRStyle]}>
        <TextComp color="#fff">{title}</TextComp>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DraggableCodes;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#2596be',
    marginVertical: 5,
    padding: 5,
    borderRadius: 5,
    // position: 'absolute',
  },
});
