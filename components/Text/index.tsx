import {Text} from 'react-native';
import React from 'react';

interface IText {
  size?: number;
  color?: string;
  children: React.ReactNode;
  style?: any;
}

const TextComp = ({
  size = 18,
  color = '#111111',
  children,
  style,
}: IText): JSX.Element => {
  return (
    <Text
      style={[
        {
          fontSize: size,
          color,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TextComp;
