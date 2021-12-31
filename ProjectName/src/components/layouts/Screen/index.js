import React from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useTheme from '@lib/themes/useTheme';
import useSchemeTransition from '@lib/themes/useSchemeTransition';

const Screen = ({style, ...props}) => {
  const theme = useTheme();
  const {dark, light} = theme;

  const {progress} = useSchemeTransition();

  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [light.BACKGROUND.primary, dark.BACKGROUND.primary],
    );

    return {backgroundColor};
  });

  return (
    <Animated.View
      {...props}
      style={[backgroundStyle, ...mergeStyles({flex: 1}, style)]}
    />
  );
};

export default Screen;
