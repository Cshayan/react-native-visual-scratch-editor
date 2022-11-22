import {useNavigation} from '@react-navigation/native';
import {useImperativeHandle, useState} from 'react';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {DraggableSpritHandler} from './index';
import {INITIAL_COORDINATES} from '../../../constants';
import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';

interface IUseDraggableSprit {
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
  forwardedRef: React.ForwardedRef<DraggableSpritHandler>;
}

export const useDraggableSprit = ({
  setX,
  setY,
  forwardedRef,
}: IUseDraggableSprit) => {
  const buttonTranslateX = useSharedValue(INITIAL_COORDINATES.x);
  const buttonTranslateY = useSharedValue(INITIAL_COORDINATES.y);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const [sayHello, setSayHello] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const setXAndY = (x_val: number, y_val: number): void => {
    setX(x_val);
    setY(y_val);
  };

  const onReset = (): void => {
    buttonTranslateX.value = INITIAL_COORDINATES.x;
    buttonTranslateY.value = INITIAL_COORDINATES.y;
    rotation.value = 0;
    scale.value = 1;
    setX(INITIAL_COORDINATES.x);
    setY(INITIAL_COORDINATES.y);
    setSayHello(false);
    navigation.setParams({animationList: []});
  };

  const moveXByFifty = (): void => {
    buttonTranslateX.value += 50;
    setXAndY(buttonTranslateX.value, buttonTranslateY.value);
  };

  const moveYByFifty = (): void => {
    buttonTranslateY.value += 50;
    setXAndY(buttonTranslateX.value, buttonTranslateY.value);
  };

  const rotateBy360 = (): void => {
    rotation.value += 180;
  };

  const moveXYToZero = (): void => {
    buttonTranslateX.value = 0;
    buttonTranslateX.value = 0;
    setXAndY(0, 0);
  };

  const moveXYByFifty = (): void => {
    buttonTranslateX.value += 50;
    buttonTranslateY.value += 50;
    setXAndY(buttonTranslateX.value, buttonTranslateY.value);
  };

  const moveToRandomPosition = (): void => {
    buttonTranslateX.value = Number(Math.random().toFixed(2));
    buttonTranslateY.value = Number(Math.random().toFixed(2));
    setXAndY(buttonTranslateX.value, buttonTranslateY.value);
  };

  const increaseSize = (): void => {
    scale.value += 0.3;
  };

  const decreaseSize = (): void => {
    scale.value -= 0.5;
  };

  const handleShowHello = (): void => {
    setSayHello(true);
  };

  const handleShowHelloFor1Sec = (): void => {
    setSayHello(true);
    setTimeout(() => {
      setSayHello(false);
    }, 1000);
  };

  useImperativeHandle(forwardedRef, () => ({
    resetXYCoordinates: onReset,
    moveXByFifty,
    moveYByFifty,
    moveXYToZero,
    rotateBy360,
    moveXYByFifty,
    moveToRandomPosition,
    increaseSize,
    decreaseSize,
    showHello: handleShowHello,
    showHelloFor1Sec: handleShowHelloFor1Sec,
  }));

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
      runOnJS(setX)(Number(e.translationX.toFixed(2)));
      runOnJS(setY)(Number(e.translationY.toFixed(2)));
    },
  });

  const draggableRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: withSpring(buttonTranslateY.value)},
        {translateX: withSpring(buttonTranslateX.value)},
        {rotateX: `${rotation.value}deg`},
        {scale: withSpring(scale.value)},
      ],
    };
  }, []);

  return {
    sayHello,
    onPanGestureEvent,
    draggableRStyle,
  };
};
