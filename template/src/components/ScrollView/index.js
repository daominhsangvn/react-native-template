import React from 'react';
import {ScrollView as RNScrollView} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useTheme from '@lib/themes/useTheme';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ScrollView = ({contentContainerStyle, ...props}) => {
  const theme = useTheme();
  const {dark, light} = theme;
  const insets = useSafeAreaInsets();

  return (
      <RNScrollView
        {...props}
        contentContainerStyle={mergeStyles({paddingBottom: insets.bottom}, contentContainerStyle)}
      />
  );
};

export default ScrollView;
