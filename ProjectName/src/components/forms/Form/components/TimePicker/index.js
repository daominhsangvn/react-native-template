import React, {useCallback} from 'react';
import RNTimepicker from 'react-native-date-picker';
import Box from '@components/layouts/Box';
import useToggle from '@lib/hooks/useToggle';
import {FormGroupContext} from '@components/forms/Form/context';
import {useController} from 'react-hook-form';
import {isDate, mergeStyles, toTime} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useSchemeTransition from '@lib/themes/useSchemeTransition';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Timepicker = ({defaultValue, theme, inputProps = {}, ...rest}) => {
  const {light, dark, styles} = theme;

  const {open, toggle} = useToggle(false);

  const {control, name, disabled} = React.useContext(FormGroupContext);

  const {
    field: {onChange, name: Name, value, ref},
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });

  const onConfirm = useCallback(
    data => {
      toggle();
      onChange(data);
    },
    [onChange, toggle],
  );

  const onCancel = useCallback(() => {
    toggle();
  }, [toggle]);

  const onPress = useCallback(() => {
    if (disabled) {
      return;
    }
    toggle();
  }, [toggle, disabled]);

  const {progress} = useSchemeTransition();

  const raInputStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [light.INPUT.text, dark.INPUT.text],
    );

    const placeholderTextColor = interpolateColor(
      progress.value,
      [0, 1],
      [light.INPUT.placeholder, dark.INPUT.placeholder],
    );

    return {color, placeholderTextColor};
  });

  return (
    <Box style={styles.container}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        onPress={onPress}
        style={{width: '100%'}}>
        <AnimatedTextInput
          name={Name}
          ref={ref}
          value={value && isDate(value) ? toTime(value) : ''}
          editable={false}
          disabled={disabled}
          {...inputProps}
          style={[
            raInputStyle,
            ...mergeStyles(
              {
                padding: rem(0.6),
              },
              inputProps.style,
            ),
          ]}
        />
      </TouchableOpacity>
      <RNTimepicker
        modal
        mode="time"
        open={open}
        date={isDate(value) ? value : new Date()}
        onConfirm={onConfirm}
        onCancel={onCancel}
        {...rest}
      />
    </Box>
  );
};

export default withTheme(Timepicker, () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  }),
);
