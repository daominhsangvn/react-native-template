import React, {useCallback, useMemo} from 'react';
import {ActivityIndicator, Keyboard, Text, View} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
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
import useStyles from '@lib/themes/useStyles';
import ThemeStyles from '@configs/themes/styles';

const _styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...ThemeStyles.btn,
  },
  textStyle: {
    ...ThemeStyles.btn_text,
  },
  loading: {
    height: 19,
  },
};

const Button = ({
  color = 'primary',
  style,
  children,
  icon = null,
  textStyle = {},
  loading = false,
  onPress,
  disabled = false,
  left,
  right,
  leftAccessory,
  leftAccessoryAbsolute = false,
  rightAccessory,
  rightAccessoryAbsolute = false,
  data,
}) => {
  const styles = useStyles(_styles);

  const buttonColor = useSchemeValue(`BUTTON.${color}`);
  const buttonDisabledColor = useSchemeValue('BUTTON.disabled');

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

  const handlePress = useCallback(() => {
    Keyboard.dismiss();
    if (onPress) {
      onPress(data);
    }
  }, [data, onPress]);

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
        runOnJS(handlePress)();
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
    let bg = buttonDisabledColor.background;

    if (!disabled) {
      if (/^#/.test(color)) {
        bg = color;
      } else {
        bg = buttonColor.background;

        if (!bg) {
          throw new Error(`Color '${color}' doesn't existed`);
        }
      }
    }

    return bg;
  }, [disabled, color, buttonColor, buttonDisabledColor]);

  const borderColor = useMemo(() => {
    let bc = buttonDisabledColor.border;

    if (disabled) {
      return bc;
    }

    if (/^#/.test(color)) {
      bc = color;
    } else {
      bc = buttonColor.border;
    }

    return bc;
  }, [disabled, color, buttonColor, buttonDisabledColor]);

  const textColor = useMemo(() => {
    let tc = buttonDisabledColor.text.color;
    if (disabled) {
      return tc;
    }
    if (/^#/.test(color)) {
      tc = color;
    } else {
      tc = buttonColor.text.color;
    }

    return tc;
  }, [buttonColor, color, buttonDisabledColor, disabled]);

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
      <Box center style={{flex: 1, flexDirection: 'row'}}>
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
      <Animated.View style={[activeStyle, {alignItems: 'center'}]}>
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
                style={{margin: 0}}
                color={textColor}
              />
            ) : (
              buttonChildren
            )}
          </LinearGradient>
        )}

        {!Array.isArray(backgroundColor) && (
          <Animated.View
            style={mergeStyles(
              styles.container,
              {backgroundColor, borderColor},
              style,
            )}>
            {renderIcon()}
            {loading ? (
              <Box center style={{flex: 1, flexDirection: 'row'}}>
                <ActivityIndicator size="small" color={'white'} />
              </Box>
            ) : (
              buttonChildren
            )}
          </Animated.View>
        )}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default Button;
