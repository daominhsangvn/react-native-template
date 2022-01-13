import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import useField from '@components/Form/useField';
import CheckBox from '@components/Checkbox';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {},
  input: {},
};

const FormChoices = ({style = {}, options, textStyle = {}, cols = 1}) => {
  const styles = useStyles(_styles);

  const {
    field: {name, onBlur, onChange, ref, value},
    fieldState: {error, invalid, isDirty, isTouched},
    formState: {},
    disabled,
  } = useField();

  const [selectedValue, setSelectedValue] = useState(null);

  const onValueChange = useCallback(
    (checked, selectedItem) => {
      if (disabled) {
        return;
      }
      setSelectedValue(selectedItem);
      onChange(selectedItem);
    },
    [disabled, onChange],
  );

  useEffect(() => {
    if (!isDirty && value !== null && typeof value !== 'undefined' && options) {
      const itemIndex = options.findIndex(o => o.value === value);
      if (itemIndex !== -1) {
        setSelectedValue(options[itemIndex].value);
      }
    }
  }, [isDirty, options, value]);

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <TextInput
        name={name}
        ref={ref}
        style={{
          opacity: 0,
          width: 1,
          height: 1,
          position: 'absolute',
        }}
      />

      {options.map(op => (
        <Box key={`choices-${op.value}`} style={{marginBottom: rem(0.4)}}>
          <CheckBox
            onChange={onValueChange}
            disabled={disabled}
            checked={selectedValue === op.value}
            text={op.label}
            value={op.value}
            textStyle={textStyle}
          />
        </Box>
      ))}
    </Box>
  );
};

export default FormChoices;
