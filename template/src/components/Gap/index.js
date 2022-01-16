import React from 'react';
import {View} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {remScale} from '@lib/themes/utils';

const Gap = ({h, v, ...rest}) => {
  return (
    <View
      style={mergeStyles(
        h && {width: remScale(h)},
        v && {height: remScale(v)},
        rest.style,
      )}
    />
  );
};

export default Gap;
