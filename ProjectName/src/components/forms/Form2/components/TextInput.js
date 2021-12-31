import React, {useContext} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {Form2FieldContext} from '@components/forms/Form2/FieldContext';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import useSchemeValue from '@lib/themes/useSchemeValue';
import Box from '@components/layouts/Box';
import Icon from '@components/Icon';
import Button from '@components/Button';
import useToggle from '@lib/hooks/useToggle';

const Form2TextInput = ({
  theme,
  style = {},
  inputStyle = {},
  secure = false,
  ...props
}) => {
  const {styles} = theme;
  const {error, isDirty, value, onChange, fieldRef} =
    useContext(Form2FieldContext);
  const {open, toggle} = useToggle(secure);
  const inputTextColor = useSchemeValue('INPUT.text');
  const placeholderTextColor = useSchemeValue('INPUT.placeholder');

  return (
    <Box style={styles.container}>
      <Box style={{flex: 1}}>
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
          secureTextEntry={open}
        />
      </Box>
      {secure && (
        <Box>
          <Button onPress={toggle}>
            {open ? (
              <Icon name="eye" size={rem(1.4)} style={styles.eyeIcon} />
            ) : (
              <Icon name="eye-off" size={rem(1.4)} style={styles.eyeIcon} />
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default withTheme(Form2TextInput, () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    eyeIcon: {
      paddingLeft: rem(0.4),
      paddingRight: rem(0.4),
    },
  }),
);
