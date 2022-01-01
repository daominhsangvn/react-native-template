import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {Form2FieldContext} from '@components/forms/Form2/FieldContext';
import Box from '@components/layouts/Box';
import Form2BaseInput from './BaseTextInput';
import {mergeStyles, windowWidth} from '@lib/utils/helpers';
import {Picker} from '@react-native-picker/picker';

const Form2Select = ({
  theme,
  style = {},
  inputProps = {},
  options = [],
  placeholder = '',
}) => {
  const {styles} = theme;
  const {error, isDirty, value, onChange, fieldRef, name, disabled, setDirty} =
    useContext(Form2FieldContext);

  const [selectedValue, setSelectedValue] = useState(null);
  const pickerRef = useRef();

  const onPress = useCallback(() => {
    if (disabled) {
      return;
    }
    setDirty(true);
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

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        onPress={onPress}
        style={{width: '100%'}}>
        <Form2BaseInput
          value={selectedValue ? selectedValue.label : ''}
          placeholder={placeholder}
          name={name}
          ref={fieldRef}
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

export default withTheme(Form2Select, () =>
  StyleSheet.create({
    container: {},
    input: {},
  }),
);
