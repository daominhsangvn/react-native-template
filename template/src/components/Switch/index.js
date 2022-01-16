import React, {useEffect, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {
  PanGestureHandler,
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {clamp, snapPoint} from 'react-native-redash';
import {scale} from 'react-native-size-matters';
import usePreviousState from '@lib/hooks/usePreviousState';
import useSchemeValue from '@lib/themes/useSchemeValue';

const config = {
  overshootClamping: true,
};
const Switch = React.forwardRef(
  (
    {
      value,
      checked,
      onChange,
      name,
      width = scale(50),
      height = scale(26),
      circle = scale(24),
      border = scale(1),
    },
    ref,
  ) => {
    const [isToggled, setIsToggled, isToggledPrevious] =
      usePreviousState(checked);
    const translateX = useSharedValue(0);
    const trackCircleWidth = useSharedValue(width - circle - border * 2);

    const inActiveBackground = useSchemeValue('SWITCH.background_inactive');
    const activeBackground = useSchemeValue('SWITCH.background_active');

    useEffect(() => {
      if (isToggled !== isToggledPrevious) {
        onChange(isToggled, value);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isToggled, value]);

    const onPress = ({
      nativeEvent: {state},
    }: TapGestureHandlerStateChangeEvent) => {
      if (state !== State.ACTIVE) {
        return;
      }
      setIsToggled(prevstate => !prevstate);
      translateX.value = withSpring(
        isToggled ? 0 : trackCircleWidth.value,
        config,
      );
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: translateX.value}],
        width: interpolate(
          translateX.value,
          [0, trackCircleWidth.value / 3, trackCircleWidth.value],
          [circle, (circle / 2) * 2.5, circle],
        ),
      };
    });

    const animatedContainerStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          translateX.value,
          [0, trackCircleWidth.value],
          [inActiveBackground, activeBackground],
        ),
      };
    });

    const onGestureEvent = useAnimatedGestureHandler({
      onStart: (_e, ctx) => {
        ctx.x = translateX.value;
      },
      onActive: ({translationX}, ctx) => {
        translateX.value = clamp(
          translationX + ctx.x,
          0,
          trackCircleWidth.value,
        );
      },
      onEnd: ({velocityX}) => {
        const selectedSnapPoint = snapPoint(translateX.value, velocityX, [
          0,
          trackCircleWidth.value,
        ]);
        translateX.value = withSpring(selectedSnapPoint, config);
        runOnJS(setIsToggled)(selectedSnapPoint !== 0);
      },
    });

    const panRef = useRef(null);

    return (
      <TapGestureHandler waitFor={panRef} onHandlerStateChange={onPress}>
        <Animated.View
          style={[
            animatedContainerStyle,
            styles.switchContainer,
            {width, height},
          ]}>
          <TextInput
            name={name}
            ref={ref}
            style={{
              opacity: 0,
              width: 1,
              height: 1,
              position: 'absolute',
            }}
          />
          <PanGestureHandler ref={panRef} onGestureEvent={onGestureEvent}>
            <Animated.View
              style={[
                animatedStyle,
                styles.circle,
                {
                  borderColor: 'transparent',
                  width: circle,
                  height: circle,
                  borderWidth: border,
                },
              ]}
            />
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    );
  },
);

export default Switch;

const styles = StyleSheet.create({
  switchContainer: {
    borderRadius: 999,
    flexDirection: 'row',
    paddingLeft: 1,
  },
  circle: {
    alignSelf: 'center',
    borderRadius: 999,
    elevation: 18,
    backgroundColor: 'white',
  },
});
