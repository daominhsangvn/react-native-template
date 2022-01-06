import React from 'react';
import {View} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';

const Card = ({children, style, ...rest}) => {
  return (
    <View
      style={mergeStyles(
        {
          shadowColor: '#3D52BE',
          shadowOffset: {
            width: 4,
            height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 6.68,

          elevation: 11,

          padding: rem(1),
          backgroundColor: '#ffffff',
          borderRadius: 8,
          margin: rem(1),
        },
        style,
      )}
      {...rest}>
      {children}
    </View>
  );
};

export default Card;
