import React from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import {View} from 'react-native';

const Box = React.forwardRef(
  ({center, flex, row, col, right, style, items, justify, ...rest}, ref) => {
    return (
      <View
        {...rest}
        ref={ref}
        style={mergeStyles(
          typeof flex !== 'undefined' && {
            flex: Number.isInteger(flex) ? flex : 1,
          },
          center && !col && {alignItems: 'center', justifyContent: 'center'},
          row && {flexDirection: 'row'},
          col && {flexDirection: 'column'},
          center && col && {alignItems: 'center'},
          right && {alignItems: 'flex-end'},
          items && {alignItems: items},
          justify && {justifyContent: justify},
          style,
        )}
      />
    );
  },
);

export default Box;
