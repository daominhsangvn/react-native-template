import React, {useCallback, useMemo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
import {rem} from '@lib/themes/utils';
import withTheme from '@lib/themes/withTheme';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useSchemeValue from '@lib/themes/useSchemeValue';
import Box from '@components/layouts/Box';

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
  transparent,
  left,
  right,
  leftAccessory,
  leftAccessoryAbsolute = false,
  rightAccessory,
  rightAccessoryAbsolute = false,
}) => {
  const {styles} = theme;

  const buttonDisabledColorValue = useSchemeValue('BUTTON.disabled');
  const buttonColorValue = useSchemeValue(`BUTTON.${color}`);

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
    onActive: () => {},
    onFail: () => {},
    onFinish: () => {
      active.value = false;
    },
  });

  const backgroundColor = useMemo(() => {
    let bg = 'transparent';

    if (transparent || outline) {
      return bg;
    }

    if (!disabled) {
      if (/^#/.test(color)) {
        bg = color;
      } else {
        bg = buttonColorValue;

        if (!bg) {
          throw new Error(`Color '${color}' doesn't existed`);
        }
      }
    } else {
      bg = buttonDisabledColorValue;
    }

    return bg;
  }, [
    transparent,
    outline,
    disabled,
    color,
    buttonColorValue,
    buttonDisabledColorValue,
  ]);

  const borderColor = useMemo(() => {
    let bc = 'transparent';

    if (transparent) {
      return bc;
    }

    if (disabled) {
      bc = buttonDisabledColorValue;
      return bc;
    }

    if (/^#/.test(color)) {
      bc = color;
    } else if (outline && !Array.isArray(buttonColorValue)) {
      bc = buttonColorValue;
    }

    return bc;
  }, [
    transparent,
    disabled,
    color,
    outline,
    buttonColorValue,
    buttonDisabledColorValue,
  ]);

  const textColor = useMemo(() => {
    let tc = 'white';
    if (/^#/.test(color)) {
      tc = color;
    } else if (outline && !Array.isArray(buttonColorValue)) {
      tc = buttonColorValue;
    }

    return tc;
  }, [buttonColorValue, color, outline]);

  const textAlign = useMemo(() => {
    if (left) {
      return 'left';
    }
    if (right) {
      return 'right';
    }
    return 'center';
  }, [left, right]);

  const leftContent = useMemo(() => {
    return (
      <Box
        style={mergeStyles(
          leftAccessoryAbsolute && {position: 'absolute', left: 0},
        )}>
        {typeof leftAccessory === 'object' &&
          React.cloneElement(leftAccessory, {
            color: textColor,
          })}
        {typeof leftAccessory === 'function' &&
          leftAccessory({color: textColor})}
      </Box>
    );
  }, [leftAccessory, leftAccessoryAbsolute, textColor]);

  const rightContent = useMemo(() => {
    return (
      <Box
        style={mergeStyles(
          rightAccessoryAbsolute && {position: 'absolute', right: 0},
        )}>
        {typeof rightAccessory === 'object' &&
          React.cloneElement(rightAccessory, {
            color: textColor,
          })}
        {typeof rightAccessory === 'function' &&
          rightAccessory({color: textColor})}
      </Box>
    );
  }, [rightAccessory, rightAccessoryAbsolute, textColor]);

  const buttonChildren = useMemo(() => {
    let _children = children;

    if (typeof children === 'string') {
      _children = (
        <Text
          style={mergeStyles(
            styles.textStyle,
            {
              color: textColor,
              textAlign,
              flex: 1,
            },
            textStyle,
          )}>
          {children}
        </Text>
      );
    }

    if (typeof children === 'function') {
      _children = children({color: textColor});
    }

    return (
      <Box style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        {leftContent}
        {_children}
        {rightContent}
      </Box>
    );
  }, [
    children,
    styles.textStyle,
    textColor,
    textStyle,
    textAlign,
    leftContent,
    rightContent,
  ]);

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[activeStyle]}>
        {Array.isArray(backgroundColor) && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={backgroundColor}
            style={mergeStyles(styles.container, {}, style)}>
            {renderIcon()}
            {loading ? (
              <ActivityIndicator
                size="small"
                style={{margin: rem(0)}}
                color={textColor}
              />
            ) : (
              buttonChildren
            )}
          </LinearGradient>
        )}

        {!Array.isArray(backgroundColor) && (
          <Animated.View
            style={[
              ...mergeStyles(
                styles.container,
                {
                  borderWidth: 1,
                },
                {backgroundColor, borderColor},
                style,
              ),
            ]}>
            {renderIcon()}
            {loading ? (
              <ActivityIndicator size="small" color={'white'} />
            ) : (
              buttonChildren
            )}
          </Animated.View>
        )}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default withTheme(Button, theme =>
  StyleSheet.create({
    container: {
      padding: rem(1),
      borderRadius: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    textStyle: {
      fontWeight: '400',
      color: 'white',
    },
    loading: {
      height: 19,
    },
  }),
);
