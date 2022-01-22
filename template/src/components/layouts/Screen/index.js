import React, {useMemo} from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useTheme from '@lib/themes/useTheme';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import {HEADER_HEIGHT} from '@configs/themes/var';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Screen = ({style = {}, children, safe = false, navbar, ...props}) => {
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

  const paddingTop = useMemo(() => {
    let value = style.padding || style.paddingTop || style.paddingVertical || 0;
    if (safe) {
      value = value + insets.top;
    }
    if (navbar) {
      value = value + HEADER_HEIGHT;
    }
    return value;
  }, [style, safe]);

  return (
    <Animated.View
      style={[backgroundStyle, ...mergeStyles({flex: 1}, style, {paddingTop})]}
      {...props}>
      {children}
    </Animated.View>
  );
};

export default Screen;
