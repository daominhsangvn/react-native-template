import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {FormGroupContext} from '@components/forms/Form/context';
import {useController} from 'react-hook-form';
import Box from '@components/layouts/Box';
import withTheme from '@lib/themes/withTheme';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {mergeStyles, windowWidth} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useSchemeTransition from '@lib/themes/useSchemeTransition';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Select = ({theme, inputProps = {}, options = []}) => {
  const {light, dark, styles} = theme;

  const [selectedValue, setSelectedValue] = useState(null);

  const pickerRef = useRef();

  const {control, name, disabled} = React.useContext(FormGroupContext);

  const {
    field: {onChange, name: Name, value, ref},
    fieldState: {isDirty},
  } = useController({
    name,
    control,
  });

  const onPress = useCallback(() => {
    if (disabled) {
      return;
    }

    pickerRef.current.focus();
  }, [disabled]);

  const onValueChange = useCallback(
    (itemValue, itemIndex) => {
      if (isDirty) {
        setSelectedValue(options[itemIndex]);
        onChange(itemValue);
      }
    },
    [isDirty, options, onChange],
  );

  useEffect(() => {
    if (!isDirty && value && options) {
      const itemIndex = options.findIndex(o => o.value === value);
      if (itemIndex !== -1) {
        setSelectedValue(options[itemIndex]);
      }
    }
  }, [isDirty, value, options]);

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
          value={selectedValue ? selectedValue.label : ''}
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
      <Picker
        ref={pickerRef}
        onValueChange={onValueChange}
        mode="dialog"
        selectedValue={value}
        value={value}
        style={{position: 'absolute', left: windowWidth + 100}}>
        {options.map(op => (
          <Picker.Item
            label={op.label}
            value={op.value}
            key={op.value}
            color={value === op.value ? 'red' : 'black'}
          />
        ))}
      </Picker>
    </Box>
  );
};

export default withTheme(Select, () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  }),
);
