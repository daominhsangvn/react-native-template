import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity, View, Platform} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {FormFieldContext} from '@components/forms/Form/FieldContext';
import Box from '@components/layouts/Box';
import Button from '@components/Button';
import FormBaseInput from './BaseTextInput';
import {mergeStyles, windowWidth} from '@lib/utils/helpers';
import useField from '@components/Form/useField';
import {rem} from '@lib/themes/utils';
import SelectPicker from './Select.Picker';

const FormSelect = ({
  theme,
  style = {},
  inputProps = {},
  options = [],
  placeholder = '',
}) => {
  const {styles} = theme;
  const {
    field: {name, onBlur, onChange, ref, value},
    fieldState: {error, invalid, isDirty, isTouched},
    formState: {},
    disabled,
  } = useField();
  const [initial, setInitial] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);

  const pickerRef = useRef();

  const selectedText = useMemo(() => {
    return selectedValue ? selectedValue.label : '';
  }, [selectedValue]);

  const onPress = useCallback(() => {
    if (disabled) {
      return;
    }

    setInitial(false);

    pickerRef?.current?.show();
  }, [disabled]);

  const onValueChange = useCallback(
    (itemValue, itemIndex) => {
      if (!initial) {
        onChange(itemValue);
        setSelectedValue(options[itemIndex]);
      }
    },
    [initial, options, onChange],
  );

  useEffect(() => {
    if (!isDirty && value && options) {
      const itemIndex = options.findIndex(o => o.value === value);
      if (itemIndex !== -1) {
        setSelectedValue(options[itemIndex]);
      }
    }
  }, [isDirty, value, options]);

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{width: '100%'}}>
        <FormBaseInput
          value={selectedText}
          placeholder={placeholder}
          name={name}
          ref={ref}
          editable={false}
          disabled={disabled}
          pointerEvents="none"
          {...inputProps}
        />
      </TouchableOpacity>

      <SelectPicker
        ref={pickerRef}
        onChange={onValueChange}
        value={value}
        options={options}
      />
    </Box>
  );
};

export default withTheme(FormSelect, () =>
  StyleSheet.create({
    container: {},
    input: {},
  }),
);
