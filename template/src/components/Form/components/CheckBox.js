import React from 'react';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import useField from '@components/Form/useField';
import CheckBox from '@components/Checkbox';
import useStyles from '@lib/themes/useStyles';

const SIZE = 20;
const _styles = {
  container: {},
  input: {},
  checkBox: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    borderWidth: 1,
    borderColor: '#a9a9a9',
    backgroundColor: '#fff',
    marginRight: rem(0.5),
  },
};

const FormCheckBox = ({style = {}, textStyle = {}, text}) => {
  const styles = useStyles(_styles);

  const {
    field: {name, onChange, ref, value},
    fieldState: {error, isDirty},
    formState: {},
    disabled,
  } = useField();

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <CheckBox
        name={name}
        ref={ref}
        onChange={onChange}
        disabled={disabled}
        checked={value}
        text={text}
        textStyle={textStyle}
      />
    </Box>
  );
};

export default FormCheckBox;
