import React from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const ScrollView = ({contentContainerStyle, ...props}) => {
  const insets = useSafeAreaInsets();

  return (
    <Animated.ScrollView
      {...props}
      contentContainerStyle={mergeStyles(
        {paddingBottom: insets.bottom},
        contentContainerStyle,
      )}
    />
  );
};

export default ScrollView;
