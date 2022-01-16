import React from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import {View} from 'react-native';

const Box = React.forwardRef(
  ({center, flex, row, col, right, style, ...rest}, ref) => {
    return (
      <View
        {...rest}
        ref={ref}
        style={mergeStyles(
          typeof flex !== 'undefined' && {
            flex: Number.isInteger(flex) ? flex : 1,
          },
          center &&
            !row &&
            !col && {alignItems: 'center', justifyContent: 'center'},
          row && {flexDirection: 'row'},
          center && row && {justifyContent: 'center'},
          col && {flexDirection: 'column'},
          center && col && {alignItems: 'center'},
          right && {alignItems: 'flex-end'},
          style,
        )}
      />
    );
  },
);

export default Box;
