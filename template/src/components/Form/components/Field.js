import React, {useMemo} from 'react';
import Box from '@components/layouts/Box';
import Text from '@components/Text';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeValue from '@lib/themes/useSchemeValue';
import withTheme from '@lib/themes/withTheme';
import {StyleSheet} from 'react-native';
import {rem} from '@lib/themes/utils';
import {useController} from 'react-hook-form';
import {FormFieldContext} from '@components/Form/FieldContext';

const FormField = ({
  control,
  name,
  theme,
  children,
  disabled = false,
  label,
  leading,
  trailing,
  containerStyle = {},
}) => {
  const controller = useController({
    control,
    name,
  });

  const {
    fieldState: {error},
  } = controller;

  const {styles} = theme;

  const borderBottomColor = useSchemeValue('INPUT.border');
  const labelColor = useSchemeValue('INPUT.label');
  const labelErrorColor = useSchemeValue('INPUT.label_error');
  const hintErrorColor = useSchemeValue('INPUT.hint_error');
  const inputIconColor = useSchemeValue('INPUT.icon');

  const renderLeading = useMemo(() => {
    if (leading) {
      return (
        <Box
          style={{
            minWidth: 20,
            alignItems: 'center',
            marginRight: rem(0.5),
          }}>
          {React.cloneElement(leading, {
            color: inputIconColor,
          })}
        </Box>
      );
    }
    return null;
  }, [leading, inputIconColor]);

  const renderTrailing = useMemo(() => {
    if (trailing) {
      return (
        <Box
          style={{
            minWidth: 20,
            alignItems: 'center',
            marginLeft: rem(0.5),
          }}>
          {React.cloneElement(trailing, {
            color: inputIconColor,
          })}
        </Box>
      );
    }
    return null;
  }, [trailing, inputIconColor]);

  return (
    <FormFieldContext.Provider value={{...controller, disabled}}>
      <Box style={styles.container} pointerEvents={disabled ? 'none' : 'auto'}>
        {label && (
          <Box style={styles.label}>
            <Text style={{color: error ? labelErrorColor : labelColor}}>
              {label}
            </Text>
          </Box>
        )}
        <Box
          style={mergeStyles(
            styles.inputContainer,
            {borderBottomColor},
            containerStyle,
          )}>
          {renderLeading}
          <Box style={{flex: 1}}>{children}</Box>
          {renderTrailing}
        </Box>
        {error && (
          <Box style={styles.hint}>
            <Text style={[styles.hintText, {color: hintErrorColor}]}>
              {error.message}
            </Text>
          </Box>
        )}
      </Box>
    </FormFieldContext.Provider>
  );
};

export default withTheme(FormField, () =>
  StyleSheet.create({
    container: {},
    label: {},
    inputContainer: {
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: rem(0.5),
    },
    hint: {},
    hintText: {
      fontSize: rem(1),
    },
  }),
);
