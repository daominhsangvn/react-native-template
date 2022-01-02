import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {FormFieldContext} from '@components/forms/Form/FieldContext';
import Box from '@components/layouts/Box';
import FormBaseInput from './BaseTextInput';
import {mergeStyles, windowWidth} from '@lib/utils/helpers';
import {Picker} from '@react-native-picker/picker';
import useField from '@components/Form/useField';

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

    pickerRef.current.focus();
  }, [disabled]);

  const onValueChange = useCallback(
    (itemValue, itemIndex) => {
      if (!initial) {
        setSelectedValue(options[itemIndex]);
        onChange(itemValue);
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
        activeOpacity={1}
        onPress={onPress}
        style={{width: '100%'}}>
        <FormBaseInput
          value={selectedText}
          placeholder={placeholder}
          name={name}
          ref={ref}
          editable={false}
          disabled={disabled}
          {...inputProps}
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

export default withTheme(FormSelect, () =>
  StyleSheet.create({
    container: {},
    input: {},
  }),
);
