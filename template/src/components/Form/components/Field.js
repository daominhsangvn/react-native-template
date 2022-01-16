import React, {useMemo} from 'react';
import Box from '@components/layouts/Box';
import Text from '@components/Text';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeValue from '@lib/themes/useSchemeValue';
import {rem} from '@lib/themes/utils';
import {useController} from 'react-hook-form';
import {FormFieldContext} from '@components/Form/FieldContext';
import useStyles from '@lib/themes/useStyles';
import FieldLeading from '@components/Form/components/Field.Leading';
import ThemeStyles from '@configs/themes/styles';

const _styles = {
  container: {},
  label: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...ThemeStyles.form_field,
  },
  errorContainer: {
    ...ThemeStyles.form_error_container,
  },
  errorText: {
    ...ThemeStyles.form_error_message,
  },
};

const FormField = ({
  control,
  name,
  children,
  disabled = false,
  label,
  leading,
  trailing,
  containerStyle = {},
  borderless = false,
  noPadding = false,
}) => {
  const controller = useController({
    control,
    name,
  });

  const {
    fieldState: {error},
  } = controller;

  const styles = useStyles(_styles);

  const borderColor = useSchemeValue('INPUT.border');
  const borderErrorColor = useSchemeValue('INPUT.border_error');
  const labelColor = useSchemeValue('INPUT.label');
  const labelErrorColor = useSchemeValue('INPUT.label_error');
  const hintErrorColor = useSchemeValue('INPUT.hint_error');
  const inputIconColor = useSchemeValue('INPUT.icon');

  const renderLeading = useMemo(() => {
    if (leading) {
      return (
        <Box
          style={[
            ThemeStyles.form_leading,
            {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          {React.cloneElement(leading, {
            color: inputIconColor,
            ...ThemeStyles.form_trailing_icon,
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
          style={[
            ThemeStyles.form_trailing,
            {
              alignItems: 'center',
            },
          ]}>
          {React.cloneElement(trailing, {
            color: inputIconColor,
            ...ThemeStyles.form_trailing_icon,
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
            {borderColor: error ? borderErrorColor : borderColor},
            !trailing && !noPadding && {paddingRight: rem(1)},
            !leading && !noPadding && {paddingLeft: rem(1)},
            borderless && {borderWidth: 0},
            containerStyle,
          )}>
          {renderLeading}
          {children}
          {renderTrailing}
        </Box>
        {error && (
          <Box style={[styles.errorContainer]}>
            <Text style={[styles.errorText, {color: hintErrorColor}]}>
              {error.message}
            </Text>
          </Box>
        )}
      </Box>
    </FormFieldContext.Provider>
  );
};

FormField.Leading = FieldLeading;

export default FormField;
