import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import {createRef, useCallback, useRef, useState} from 'react';
import {IEditor} from '.';
import {INITIAL_COORDINATES} from '../../constants';

interface ParamList extends ParamListBase {
  Editor: {
    animationListOne: any[];
    animationListTwo: any[];
    spritID: number;
    actionToExecute: number;
  };
}

export const useEditorFunctionality = ({list}: IEditor) => {
  const [x, setX] = useState<number>(INITIAL_COORDINATES.x);
  const [y, setY] = useState<number>(INITIAL_COORDINATES.y);
  const elementsRef = useRef<any>(list.map(() => createRef()));
  const {
    params: {
      animationListOne = [],
      animationListTwo = [],
      spritID = 0,
      actionToExecute = 1,
    } = {},
  } = useRoute<RouteProp<ParamList, 'Editor'>>();

  const handleResetButtonPress = (): void => {
    list.forEach((_, idx) =>
      elementsRef?.current?.[idx]?.current?.resetXYCoordinates?.(),
    );
  };

  const handlePlayButtonPress = useCallback(() => {
    const animationList =
      actionToExecute === 1 ? animationListOne : animationListTwo;
    if (animationList?.length) {
      animationList?.forEach((alist: any) => {
        if (alist?.id === 0) {
          elementsRef?.current?.[spritID]?.current?.moveXByFifty();
        }
        if (alist?.id === 1) {
          elementsRef?.current?.[spritID]?.current?.moveYByFifty();
        }
        if (alist?.id === 2) {
          elementsRef?.current?.[spritID]?.current?.rotateBy360();
        }
        if (alist?.id === 3) {
          elementsRef?.current?.[spritID]?.current?.moveXYToZero();
        }
        if (alist?.id === 4) {
          elementsRef?.current?.[spritID]?.current?.moveXYByFifty();
        }
        if (alist?.id === 5) {
          elementsRef?.current?.[spritID]?.current?.moveToRandomPosition();
        }
        if (alist?.id === 6) {
          elementsRef?.current?.[spritID]?.current?.showHello();
        }
        if (alist?.id === 7) {
          elementsRef?.current?.[spritID]?.current?.showHelloFor1Sec();
        }
        if (alist?.id === 8) {
          elementsRef?.current?.[spritID]?.current?.increaseSize();
        }
        if (alist?.id === 9) {
          elementsRef?.current?.[spritID]?.current?.decreaseSize();
        }
      });
    }
  }, [animationListOne, animationListTwo, spritID, actionToExecute]);

  // const executeFirstAnimation = async () => {
  //   for (let i = 0; i < animationList?.[0]?.length; i++) {
  //     await console.log('i');
  //   }
  // };

  // const handlePlayButtonPress = () => {};

  return {
    x,
    y,
    setX,
    setY,
    elementsRef,
    handleResetButtonPress,
    handlePlayButtonPress,
  };
};
