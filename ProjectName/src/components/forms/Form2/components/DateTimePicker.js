import React, {useCallback, useContext, useMemo} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {Form2FieldContext} from '@components/forms/Form2/FieldContext';
import {
  isDate,
  mergeStyles,
  toFullDate, toLongDate,
  toShortDate,
  toTime,
} from "@lib/utils/helpers";
import {rem} from '@lib/themes/utils';
import useSchemeValue from '@lib/themes/useSchemeValue';
import Box from '@components/layouts/Box';
import Icon from '@components/Icon';
import Button from '@components/Button';
import useToggle from '@lib/hooks/useToggle';
import Form2BaseInput from '@components/forms/Form2/components/BaseTextInput';
import RNDatePicker from 'react-native-date-picker';

const Form2DateTimePicker = ({
  theme,
  style = {},
  inputProps = {},
  placeholder = '',
  ...rest
}) => {
  const {styles} = theme;
  const {error, isDirty, value, onChange, fieldRef, name, disabled} =
    useContext(Form2FieldContext);

  const formattedValue = useMemo(() => {
    if (value && isDate(value)) {
      if (rest.mode === 'date') {
        return toShortDate(value);
      } else if (rest.mode === 'time') {
        return toTime(value);
      } else {
        return toFullDate(value);
      }
    } else {
      return '';
    }
  }, [value, rest.mode]);

  const {open, toggle} = useToggle(false);

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

  return (
    <Box style={styles.container}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        onPress={onPress}
        style={{width: '100%'}}>
        <Form2BaseInput
          {...inputProps}
          placeholder={placeholder}
          name={name}
          ref={fieldRef}
          value={formattedValue}
          editable={false}
          disabled={disabled}
        />
      </TouchableOpacity>
      <RNDatePicker
        modal
        mode="datetime"
        open={open}
        date={isDate(value) ? value : new Date()}
        onConfirm={onConfirm}
        onCancel={onCancel}
        {...rest}
      />
    </Box>
  );
};

export default withTheme(Form2DateTimePicker, () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    eyeIcon: {
      paddingLeft: rem(0.4),
      paddingRight: rem(0.4),
    },
  }),
);
