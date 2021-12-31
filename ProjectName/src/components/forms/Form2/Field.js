import React from 'react';
import {Form2FieldContext} from '@components/forms/Form2/FieldContext';
import Box from '@components/layouts/Box';
import {StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import useField from '@components/forms/Form2/useField';
import Text from '@components/Text';
import {rem} from '@lib/themes/utils';
import useSchemeValue from '@lib/themes/useSchemeValue';

const Form2Field = ({
  theme,
  name,
  children,
  disabled,
  label,
  leading,
  trailing,
}) => {
  const {styles} = theme;

  const {error, isDirty, value, onChange, fieldRef} = useField({name});

  const borderBottomColor = useSchemeValue('INPUT.border');
  const labelColor = useSchemeValue('INPUT.label');
  const labelErrorColor = useSchemeValue('INPUT.label_error');
  const hintErrorColor = useSchemeValue('INPUT.hint_error');
  const inputIconColor = useSchemeValue('INPUT.icon');

  return (
    <Form2FieldContext.Provider
      value={{error, isDirty, value, onChange, name, fieldRef}}>
      <Box style={styles.container} pointerEvents={disabled ? 'none' : 'auto'}>
        {label && (
          <Box style={styles.label}>
            <Text style={{color: error ? labelErrorColor : labelColor}}>
              {label}
            </Text>
          </Box>
        )}
        <Box style={[styles.inputContainer, {borderBottomColor}]}>
          {leading && (
            <Box>
              {React.cloneElement(leading, {
                color: inputIconColor,
              })}
            </Box>
          )}
          <Box style={{flex: 1}}>{children}</Box>
          {trailing && (
            <Box>
              {React.cloneElement(trailing, {
                color: inputIconColor,
              })}
            </Box>
          )}
        </Box>
        {error && (
          <Box style={styles.hint}>
            <Text style={[styles.hintText, {color: hintErrorColor}]}>
              {error.message}
            </Text>
          </Box>
        )}
      </Box>
    </Form2FieldContext.Provider>
  );
};

export default withTheme(Form2Field, () =>
  StyleSheet.create({
    container: {},
    label: {},
    inputContainer: {
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    hint: {},
    hintText: {
      fontSize: rem(1),
    },
  }),
);
