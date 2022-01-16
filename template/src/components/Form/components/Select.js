import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Box from '@components/layouts/Box';
import FormBaseInput from './BaseTextInput';
import {mergeStyles} from '@lib/utils/helpers';
import useField from '@components/Form/useField';
import SelectPicker from './Select.Picker';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {
    flex: 1,
  },
  input: {},
};

const FormSelect = ({
  style = {},
  inputProps = {},
  options = [],
  placeholder = '',
}) => {
  const styles = useStyles(_styles);
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

  const onClear = useCallback(() => {
    onChange(null);
    setSelectedValue(null);
  }, []);

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
      <FormBaseInput
        value={selectedText}
        placeholder={placeholder}
        name={name}
        ref={ref}
        editable={false}
        disabled={disabled}
        pointerEvents="none"
        onPress={onPress}
        onClear={onClear}
        {...inputProps}
      />

      <SelectPicker
        ref={pickerRef}
        onChange={onValueChange}
        value={value}
        options={options}
      />
    </Box>
  );
};

export default FormSelect;
