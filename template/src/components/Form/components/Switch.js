import React from 'react';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import useField from '@components/Form/useField';
import Switch from '@components/Switch';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {},
  input: {},
};

const FormSwitch = ({style = {}, textStyle = {}, text}) => {
  const styles = useStyles(_styles);

  const {
    field: {name, onChange, ref, value},
    fieldState: {error, isDirty},
    formState: {},
    disabled,
  } = useField();

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <Switch
        name={name}
        ref={ref}
        onChange={onChange}
        disabled={disabled}
        checked={value}
      />
    </Box>
  );
};

export default FormSwitch;
