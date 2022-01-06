import React from 'react';
import {StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Box from '@components/layouts/Box';
import FormBaseInput from './BaseTextInput';
import {mergeStyles} from '@lib/utils/helpers';
import useField from '@components/Form/useField';

const FormTextInput = ({
  theme,
  style = {},
  inputStyle = {},
  secure = false,
  ...props
}) => {
  const {styles} = theme;

  const {
    field: {name, onChange, ref, value},
    fieldState: {error},
    formState: {},
    disabled,
  } = useField();

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <FormBaseInput
        style={mergeStyles(styles.input, inputStyle)}
        disabled={disabled}
        onChangeText={onChange}
        value={value}
        ref={ref}
        name={name}
        {...props}
      />
    </Box>
  );
};

export default withTheme(FormTextInput, () =>
  StyleSheet.create({
    container: {
    },
    input: {},
  }),
);