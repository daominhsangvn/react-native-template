import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import useSchemeValue from '@lib/themes/useSchemeValue';
import Box from '@components/layouts/Box';
import Icon from '@components/Icon';
import Button from '@components/Button';
import useToggle from '@lib/hooks/useToggle';

const FormBaseInput = React.forwardRef(
  ({theme, style = {}, secure = false, ...props}, ref) => {
    const {styles} = theme;
    const {open, toggle} = useToggle(secure);
    const inputTextColor = useSchemeValue('INPUT.text');
    const placeholderTextColor = useSchemeValue('INPUT.placeholder');

    return (
      <Box style={styles.container}>
        <Box style={{flex: 1}}>
          <TextInput
            {...props}
            ref={ref}
            placeholderTextColor={placeholderTextColor}
            style={mergeStyles(
              {
                padding: 0,
                fontSize: rem(1.2),
                color: inputTextColor,
              },
              style,
            )}
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
  },
);

export default withTheme(FormBaseInput, () =>
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
