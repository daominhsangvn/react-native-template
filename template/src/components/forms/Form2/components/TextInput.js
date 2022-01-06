import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {Form2FieldContext} from '@components/forms/Form2/FieldContext';
import Box from '@components/layouts/Box';
import Form2BaseInput from './BaseTextInput';
import {mergeStyles} from '@lib/utils/helpers';

const Form2TextInput = ({
  theme,
  style = {},
  inputStyle = {},
  secure = false,
  ...props
}) => {
  const {styles} = theme;
  const {error, isDirty, value, onChange, fieldRef, name, disabled} =
    useContext(Form2FieldContext);

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <Form2BaseInput
        name={name}
        value={value}
        onChangeText={onChange}
        ref={fieldRef}
        style={mergeStyles(styles.input, inputStyle)}
        disabled={disabled}
      />
    </Box>
  );
};

export default withTheme(Form2TextInput, () =>
  StyleSheet.create({
    container: {},
    input: {},
  }),
);
