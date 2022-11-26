import {createRef, useContext, useRef, useState} from 'react';
import {IEditor} from '.';
import {INITIAL_COORDINATES} from '../../constants';
import {AppContext} from '../../context/context';

export const useEditorFunctionality = ({list}: IEditor) => {
  const [x, setX] = useState<number>(INITIAL_COORDINATES.x);
  const [y, setY] = useState<number>(INITIAL_COORDINATES.y);
  const elementsRef = useRef<any>(list.map(() => createRef()));

  const {state, dispatch} = useContext(AppContext);

  const handleResetButtonPress = (): void => {
    list.forEach((_, idx) =>
      elementsRef?.current?.[idx]?.current?.resetXYCoordinates?.(),
    );
  };

  console.log('context', state);

  const handlePlayButtonPress = () => {
    state?.animations?.forEach((animation: any, index: number) => {
      animation?.items?.forEach((item: any) => {
        console.log(index, 'index');
        if (item?.id === 0) {
          elementsRef?.current?.[index]?.current?.moveXByFifty();
        }
        if (item?.id === 1) {
          elementsRef?.current?.[index]?.current?.moveYByFifty();
        }
        if (item?.id === 2) {
          elementsRef?.current?.[index]?.current?.rotateBy360();
        }
        if (item?.id === 3) {
          elementsRef?.current?.[index]?.current?.moveXYToZero();
        }
        if (item?.id === 4) {
          elementsRef?.current?.[index]?.current?.moveXYByFifty();
        }
        if (item?.id === 5) {
          elementsRef?.current?.[index]?.current?.moveToRandomPosition();
        }
        if (item?.id === 6) {
          elementsRef?.current?.[index]?.current?.showHello();
        }
        if (item?.id === 7) {
          elementsRef?.current?.[index]?.current?.showHelloFor1Sec();
        }
        if (item?.id === 8) {
          elementsRef?.current?.[index]?.current?.increaseSize();
        }
        if (item?.id === 9) {
          elementsRef?.current?.[index]?.current?.decreaseSize();
        }
      });
    });
  };

  return {
    x,
    y,
    setX,
    setY,
    elementsRef,
    handleResetButtonPress,
    handlePlayButtonPress,
    dispatch,
  };
};
