import React, {useMemo} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import useSchemeValue from '@lib/themes/useSchemeValue';
import Box from '@components/layouts/Box';
import Icon from '@components/Icon';
import Button from '@components/Button';
import useToggle from '@lib/hooks/useToggle';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    paddingLeft: rem(0.4),
    paddingRight: rem(0.4),
  },
};

const FormBaseInput = React.forwardRef(
  ({theme, style = {}, secure = false, ...props}, ref) => {
    const styles = useStyles(_styles);
    const {open, toggle} = useToggle(secure);
    const inputTextColor = useSchemeValue('INPUT.text');
    const placeholderTextColor = useSchemeValue('INPUT.placeholder');

    const toggleIcon = useMemo(() => {
      if (!open) {
        return <Icon name="eye-off" size={rem(1.4)} style={styles.eyeIcon} />;
      }
      return <Icon name="eye" size={rem(1.4)} style={styles.eyeIcon} />;
    }, [open, styles.eyeIcon]);

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
            <Button transparent onPress={toggle} style={{padding: 0, backgroundColor: 'red'}}>
              {toggleIcon}
            </Button>
          </Box>
        )}
      </Box>
    );
  },
);

export default FormBaseInput;
