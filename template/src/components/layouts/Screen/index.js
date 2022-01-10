import React from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useTheme from '@lib/themes/useTheme';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import {HEADER_HEIGHT} from '@configs/themes/var';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Screen = ({style = {}, children, navbar = false, ...props}) => {
  const theme = useTheme();
  const {dark, light} = theme;
  const insets = useSafeAreaInsets();
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
      style={[backgroundStyle, ...mergeStyles({flex: 1}, style, navbar && { paddingTop: HEADER_HEIGHT + insets.top + (style.padding || style.paddingTop || style.paddingVertical || 0) })]}
      {...props}>
      {children}
    </Animated.View>
  );
};

export default Screen;
