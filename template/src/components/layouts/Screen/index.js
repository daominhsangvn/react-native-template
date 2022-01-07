import React, {useMemo} from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useTheme from '@lib/themes/useTheme';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import ScrollView from '@components/ScrollView';

const Screen = ({
  style = {},
  scrollable = false,
  scrollProps = {},
  children,
  ...props
}) => {
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

  const renderChildren = useMemo(() => {
    if (!scrollable) {
      return children;
    }

    return <ScrollView {...scrollProps}>{children}</ScrollView>;
  }, [scrollable, scrollProps, children]);

  return (
    <Animated.View
      style={[backgroundStyle, ...mergeStyles({flex: 1}, style)]}
      {...props}>
      {renderChildren}
    </Animated.View>
  );
};

export default Screen;
