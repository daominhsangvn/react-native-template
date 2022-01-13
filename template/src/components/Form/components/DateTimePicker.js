import React, {useCallback, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {isDate, toFullDate, toShortDate, toTime} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import Box from '@components/layouts/Box';
import useToggle from '@lib/hooks/useToggle';
import RNDatePicker from 'react-native-date-picker';
import FormBaseInput from '@components/Form/components/BaseTextInput';
import useField from '@components/Form/useField';
import useStyles from '@lib/themes/useStyles';
import Icon from '@components/Icon';

const _styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eyeIcon: {
    paddingLeft: rem(0.4),
    paddingRight: rem(0.4),
  },
};

const FormDateTimePicker = ({
  style = {},
  inputProps = {},
  placeholder = '',
  clearable = true,
  ...rest
}) => {
  const styles = useStyles(_styles);

  const {
    field: {name, onBlur, onChange, ref, value},
    fieldState: {error, invalid, isDirty, isTouched},
    formState: {},
    disabled,
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

  const today = useMemo(() => new Date(), []);

  const pickerValue = useMemo(() => {
    return isDate(value) ? value : today;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const {open, toggle} = useToggle(false);

  const onConfirm = useCallback(
    data => {
      toggle();
      onChange(data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggle],
  );

  const onCancel = useCallback(() => {
    toggle();
  }, [toggle]);

  const clear = useCallback(() => {
    onChange(null);
  }, []);

  const onPress = useCallback(() => {
    if (disabled) {
      return;
    }
    toggle();
  }, [toggle, disabled]);

  return (
    <Box style={styles.container}>
      <TouchableOpacity disabled={disabled} onPress={onPress} style={{flex: 1}}>
        <FormBaseInput
          {...inputProps}
          pointerEvents="none"
          placeholder={placeholder}
          name={name}
          ref={ref}
          value={formattedValue}
          editable={false}
          disabled={disabled}
        />
      </TouchableOpacity>
      {clearable && !!value && (
        <TouchableOpacity onPress={clear}>
          <Icon name="ios-close" size={16} color={'#8d8d8d'} />
        </TouchableOpacity>
      )}
      <RNDatePicker
        modal
        mode="datetime"
        open={open}
        date={pickerValue}
        onConfirm={onConfirm}
        onCancel={onCancel}
        {...rest}
      />
    </Box>
  );
};

export default FormDateTimePicker;
