import React from 'react';
import {View} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';

const Gap = ({h, v, ...rest}) => {
  return (
    <View
      style={mergeStyles(
        h && {width: rem(h)},
        v && {height: rem(v)},
        rest.style,
      )}
    />
  );
};

export default Gap;
