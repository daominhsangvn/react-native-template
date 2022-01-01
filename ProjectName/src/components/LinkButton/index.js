import React from 'react';
import {TouchableOpacity} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useTheme from '@lib/themes/useTheme';

const LinkButton = ({children, textStyle, style, ...rest}) => {
  const {progress} = useSchemeTransition();
  const {light, dark} = useTheme();

  const rnTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [light.BUTTON.link, dark.BUTTON.link],
    );

    return {color};
  });

  return (
    <TouchableOpacity {...rest} style={mergeStyles({}, style)}>
      {typeof children === 'string' && (
        <Animated.Text style={[rnTextStyle, ...mergeStyles(textStyle)]}>
          {children}
        </Animated.Text>
      )}
      {typeof children !== 'string' && children}
    </TouchableOpacity>
  );
};

export default LinkButton;
