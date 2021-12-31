import React, {useMemo} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import {mergeStyles} from '@lib/utils/helpers';

const Icon = ({component = Ionicons, color, style, ...props}) => {
  const AnimatedIcon = useMemo(
    () => Animated.createAnimatedComponent(component),
    [component],
  );

  const {progress} = useSchemeTransition();

  const raStyle = useAnimatedStyle(() => {
    const colorRange = [];

    if (!color) {
      return {};
    }

    if (typeof color === 'string') {
      colorRange.push(color);
      colorRange.push(color);
    }

    if (Array.isArray(color)) {
      if (color.length === 1) {
        colorRange.push(color[0]);
        colorRange.push(color[0]);
      } else if (color.length > 1) {
        colorRange.push(color[0]);
        colorRange.push(color[1]);
      } else {
        return {};
      }
    }

    const interpolatedColor = interpolateColor(
      progress.value,
      [0, 1],
      colorRange,
    );

    return {color: interpolatedColor};
  });

  return <AnimatedIcon {...props} style={[raStyle, ...mergeStyles(style)]} />;
};

Icon.displayName = 'RAIcon';

export default Icon;
