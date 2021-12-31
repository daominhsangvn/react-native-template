import React from 'react';
import {TouchableOpacity} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';

const HeaderButton = ({style, ...props}) => {
  return (
    <TouchableOpacity
      style={mergeStyles(
        {
          paddingHorizontal: 12,
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
        },
        style,
      )}
      {...props}
    />
  );
};

export default HeaderButton;
