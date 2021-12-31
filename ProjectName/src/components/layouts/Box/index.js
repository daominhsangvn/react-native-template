import React from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import Animated from 'react-native-reanimated';

const Box = React.forwardRef(({center, right, style, ...rest}, ref) => {
  return (
    <Animated.View
      {...rest}
      ref={ref}
      style={mergeStyles(
        center && {alignItems: 'center', justifyContent: 'center'},
        right && {alignItems: 'flex-end'},
        style,
      )}
    />
  );
});

export default Box;
