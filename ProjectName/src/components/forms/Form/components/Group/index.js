import {FormGroupContext} from '@components/forms/Form/context';
import Box from '@components/layouts/Box';
import {rem} from '@lib/themes/utils';
import withTheme from '@lib/themes/withTheme';
import React, {useEffect} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import Animated, {
  interpolateColor,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import useLayout from '@lib/hooks/useLayout';

const Group = ({control, name, disabled, theme, children}) => {
  const {light, dark, styles} = theme;
  const {
    fieldState: {error},
  } = useController({name, control});
  const height = useSharedValue(0);
  const {progress} = useSchemeTransition();
  const rnHintStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [
        error ? light.INPUT.hint_error : light.INPUT.hint,
        error ? dark.INPUT.hint_error : dark.INPUT.hint,
      ],
    );

    return {color};
  }, [error]);
  const [layout, onLayout] = useLayout(0);
  const transition = useDerivedValue(() => {
    return error ? withTiming(1) : withTiming(0);
  }, [error]);
  const rHintContainerStyle = useAnimatedStyle(() => {
    return {height: transition.value * height.value + 1};
  });

  useEffect(() => {
    runOnUI(() => {
      'worklet';
      height.value = layout.height;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout.height]);

  return (
    <FormGroupContext.Provider
      value={{
        control,
        name,
        disabled,
      }}>
      <Box>{children}</Box>
      <Animated.View style={[rHintContainerStyle, {overflow: 'hidden'}]}>
        <View onLayout={onLayout} style={{position: 'absolute'}}>
          <Animated.Text style={[rnHintStyle, styles.message]}>
            {error && error.message}
          </Animated.Text>
        </View>
      </Animated.View>
    </FormGroupContext.Provider>
  );
};

export default withTheme(Group, () =>
  StyleSheet.create({
    boxError: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    message: {
      fontSize: rem(1),
      marginTop: rem(0.3),
    },
  }),
);
