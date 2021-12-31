import React, {useContext} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {Form2FieldContext} from '@components/forms/Form2/FieldContext';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import useSchemeValue from '@lib/themes/useSchemeValue';

const Form2TextInput = ({
  theme,
  style = {},
  inputStyle = {},
  secure = false,
  ...props
}) => {
  const {error, isDirty, value, onChange, fieldRef} =
    useContext(Form2FieldContext);

  const inputTextColor = useSchemeValue('INPUT.text');
  const placeholderTextColor = useSchemeValue('INPUT.placeholder');

  return (
    <TextInput
      {...props}
      placeholderTextColor={placeholderTextColor}
      style={mergeStyles(
        {padding: rem(0.3), color: inputTextColor},
        inputStyle,
      )}
      ref={fieldRef}
      value={value}
      onChangeText={onChange}
    />
  );
};

export default withTheme(Form2TextInput, () => StyleSheet.create({}));
