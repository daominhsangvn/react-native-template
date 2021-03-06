import React, {useCallback} from 'react';
import Box from '@components/layouts/Box';
import FormBaseInput from './BaseTextInput';
import {mergeStyles} from '@lib/utils/helpers';
import useField from '@components/Form/useField';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {
    flex: 1,
  },
};

const FormTextInput = ({style = {}, inputStyle = {}, ...props}) => {
  const styles = useStyles(_styles);
  const {
    field: {name, onChange, ref, value},
    fieldState: {error},
    formState: {},
    disabled,
  } = useField();

  const onClear = useCallback(() => {
    onChange('');
  }, []);

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <FormBaseInput
        style={mergeStyles(styles.input, inputStyle)}
        disabled={disabled}
        onChangeText={onChange}
        onClear={onClear}
        value={value}
        ref={ref}
        name={name}
        {...props}
      />
    </Box>
  );
};

export default FormTextInput;
