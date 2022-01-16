import React from 'react';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import useField from '@components/Form/useField';
import CheckBox from '@components/Checkbox';
import useStyles from '@lib/themes/useStyles';
import Text from '@components/Text';
import useSchemeValue from '@lib/themes/useSchemeValue';
import ThemeStyles from '@configs/themes/styles';

const _styles = {
  container: {
    flexDirection: 'row',
  },
  input: {},
};

const FormCheckBox = ({style = {}, children}) => {
  const styles = useStyles(_styles);

  const {
    field: {name, onChange, ref, value},
    fieldState: {error, isDirty},
    formState: {},
    disabled,
  } = useField();

  const textColor = useSchemeValue('CHECKBOX.text');

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <Box>
        <CheckBox
          name={name}
          ref={ref}
          onChange={onChange}
          disabled={disabled}
          checked={value}
        />
      </Box>
      <Box>
        <Text style={mergeStyles(ThemeStyles.checkBoxText, {color: textColor})}>
          {children}
        </Text>
      </Box>
    </Box>
  );
};

export default FormCheckBox;
