import React from 'react';
import {StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useSchemeTransition from '@lib/themes/useSchemeTransition';

const Text = ({style, theme, ...props}) => {
  const {dark, light} = theme;

  const {progress} = useSchemeTransition();

  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [light.TEXT.primary, dark.TEXT.primary],
    );

    return {color};
  });

  return <Animated.Text {...props} style={[textStyle, style]} />;
};

export default withTheme(Text, theme => StyleSheet.create({}));
