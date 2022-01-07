import React from 'react';
import {ScrollView as RNScrollView} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ScrollView = ({contentContainerStyle, ...props}) => {
  const insets = useSafeAreaInsets();

  return (
    <RNScrollView
      {...props}
      contentContainerStyle={mergeStyles(
        {paddingBottom: insets.bottom},
        contentContainerStyle,
      )}
    />
  );
};

export default ScrollView;
