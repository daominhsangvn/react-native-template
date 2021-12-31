import React, {useCallback, useMemo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
import {rem} from '@lib/themes/utils';
import withTheme from '@lib/themes/withTheme';
import {LongPressGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useSchemeTransition from '@lib/themes/useSchemeTransition';

const Button = ({
  color = 'primary',
  style,
  children,
  outline = false,
  icon = null,
  textStyle = {},
  loading = false,
  theme,
  onPress,
  disabled = false,
  ...rest
}) => {
  const {light, dark, scheme, styles} = theme;

  const solid = useMemo(() => {
    const color1 = light.BUTTON[color];
    const color2 = dark.BUTTON[color];
    return !(Array.isArray(color1) && Array.isArray(color2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const gradientColors = useMemo(() => {
    if (solid) {
      return [];
    }

    if (disabled) {
      return [light.BUTTON.disabled, dark.BUTTON.disabled];
    }

    const color1 = light.BUTTON[color];
    const color2 = dark.BUTTON[color];

    if (!color1 || !color2) {
      throw new Error(`Gradient color '${color}' doesn't existed`);
    }

    return scheme === 'dark' ? color2 : color1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solid, color, disabled]);

  const renderIcon = useCallback(() => {
    if (icon) {
      return <View style={{marginRight: 5}}>{icon}</View>;
    }

    return null;
  }, [icon]);

  const active = useSharedValue(false);

  const activeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active.value ? 0.9 : 1, {
            duration: 100,
          }),
        },
      ],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      if (!disabled) {
        active.value = true;
      }
    },
    onCancel: () => {
      active.value = false;
    },
    onEnd: () => {
      if (onPress && !disabled) {
        runOnJS(onPress)();
      }

      active.value = false;
    },
  });

  const {progress} = useSchemeTransition();

  const rStyle = useAnimatedStyle(() => {
    if (!solid) {
      return {};
    }

    let color1 = light.BUTTON[color];
    let color2 = dark.BUTTON[color];

    if (!disabled) {
      if (/^#/.test(color)) {
        color1 = color;
        color2 = color;
      } else {
        if (!color1 || !color2) {
          throw new Error(`Color '${color}' doesn't existed`);
        }

        if (Array.isArray(color1) || Array.isArray(color2)) {
          throw new Error(`Color '${color}' must be a string`);
        }
      }
    } else {
      color1 = light.BUTTON.disabled;
      color2 = dark.BUTTON.disabled;
    }

    let backgroundColor = 'transparent';

    if (!outline) {
      backgroundColor = interpolateColor(
        progress.value,
        [0, 1],
        [color1, color2],
      );
    }

    let borderColor = 'transparent';

    if (outline) {
      borderColor = interpolateColor(progress.value, [0, 1], [color1, color2]);
    }

    return {backgroundColor, borderColor};
  }, [color, outline, scheme]);

  return (
    <LongPressGestureHandler
      minDurationMs={0.5}
      maxDist={10}
      onGestureEvent={gestureHandler}>
      <Animated.View style={[activeStyle]}>
        {typeof children === 'string' ? (
          solid || outline ? (
            <Animated.View
              style={[
                rStyle,
                ...mergeStyles(
                  styles.container,
                  {
                    borderWidth: 1,
                  },
                  style,
                ),
              ]}>
              {renderIcon()}
              {loading ? (
                <ActivityIndicator size="small" color={'white'} />
              ) : (
                <Text style={mergeStyles(styles.textStyle, textStyle)}>
                  {children}
                </Text>
              )}
            </Animated.View>
          ) : (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={gradientColors}
              style={mergeStyles(styles.container, {}, style)}>
              {renderIcon()}
              {loading ? (
                <ActivityIndicator
                  size="small"
                  style={{margin: rem(0)}}
                  color={'white'}
                />
              ) : (
                <Text style={mergeStyles(styles.textStyle, textStyle)}>
                  {children}
                </Text>
              )}
            </LinearGradient>
          )
        ) : (
          children
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
};

export default withTheme(Button, theme =>
  StyleSheet.create({
    container: {
      padding: rem(1),
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    textStyle: {
      fontWeight: 'bold',
      color: 'white',
    },
    loading: {
      height: 19,
    },
  }),
);
