import React from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import {HEADER_HEIGHT} from '@configs/themes/var';

const ScrollView = ({contentContainerStyle, navbar = false, ...props}) => {
  const insets = useSafeAreaInsets();

  return (
    <Animated.ScrollView
      {...props}
      scrollEventThrottle={1}
      contentContainerStyle={mergeStyles(
        {paddingBottom: insets.bottom},
        contentContainerStyle,
        navbar && {
          paddingTop:
            HEADER_HEIGHT +
            insets.top +
            (contentContainerStyle.padding ||
              contentContainerStyle.paddingTop ||
              contentContainerStyle.paddingVertical ||
              0),
        },
      )}
    />
  );
};

export default ScrollView;
