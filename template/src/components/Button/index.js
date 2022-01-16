import React, {useCallback, useMemo} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
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
  outline = false,
  icon = null,
  textStyle = {},
  loading = false,
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
  const styles = useStyles(_styles);

  const buttonDisabledColorValue = useSchemeValue('BUTTON.disabled');
  const buttonColorValue = useSchemeValue(`BUTTON.${color}`);
  const textColorValue = useSchemeValue(`BUTTON.${color}_text`);

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
    } else if (outline && !Array.isArray(textColorValue)) {
      tc = textColorValue;
    }

    return tc;
  }, [textColorValue, color, outline]);

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

export default Button;
