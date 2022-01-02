import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {isDate, toFullDate, toShortDate, toTime} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import Box from '@components/layouts/Box';
import useToggle from '@lib/hooks/useToggle';
import RNDatePicker from 'react-native-date-picker';
import FormBaseInput from '@components/Form/components/BaseTextInput';
import useField from '@components/Form/useField';

const FormDateTimePicker = ({
  theme,
  style = {},
  inputProps = {},
  placeholder = '',
  ...rest
}) => {
  const {styles} = theme;

  const {
    field: {name, onBlur, onChange, ref, value},
    fieldState: {error, invalid, isDirty, isTouched},
    formState: {},
    disabled
  } = useField();

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
        <FormBaseInput
          {...inputProps}
          placeholder={placeholder}
          name={name}
          ref={ref}
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

export default withTheme(FormDateTimePicker, () =>
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
