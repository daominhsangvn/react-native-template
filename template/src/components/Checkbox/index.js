import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, TextInput} from 'react-native';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import {MotiView} from 'moti';
import Icon from '@components/Icon';
import useStyles from '@lib/themes/useStyles';
import ThemeStyles from '@configs/themes/styles';
import useSchemeValue from '@lib/themes/useSchemeValue';

const _styles = {
  container: {
    flex: 1,
  },
  input: {},
  checkBoxContainer: {
    ...ThemeStyles.checkBoxContainer,
  },
  checkBox: {
    ...ThemeStyles.checkBox,
  },
};

const CheckBox = React.forwardRef(
  ({style = {}, disabled, onChange, name, checked, value}, ref) => {
    const styles = useStyles(_styles);

    const [isChecked, setIsChecked] = useState(checked);
    const disabledBackgroundColor = useSchemeValue(
      'CHECKBOX.disabled_background',
    );
    const disabledBorderColor = useSchemeValue('CHECKBOX.disabled_border');
    const unfillBackgroundColor = useSchemeValue('CHECKBOX.unfill_background');
    const unfillBorderColor = useSchemeValue('CHECKBOX.unfill_border');
    const fillColor = useSchemeValue('CHECKBOX.primary');

    const onPress = useCallback(() => {
      if (disabled) {
        return;
      }
      const val = !isChecked;
      setIsChecked(val);
      onChange(val, value);
    }, [isChecked, onChange, disabled, value]);

    useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    return (
      <Box style={mergeStyles(styles.container, style)}>
        <TextInput
          name={name}
          ref={ref}
          style={{
            opacity: 0,
            width: 1,
            height: 1,
            position: 'absolute',
          }}
        />
        <Pressable onPress={onPress}>
          <MotiView
            style={[
              styles.checkBoxContainer,
              {
                backgroundColor: unfillBackgroundColor,
                borderColor: unfillBorderColor,
              },
              disabled && {
                backgroundColor: disabledBackgroundColor,
                borderColor: disabledBorderColor,
              },
            ]}>
            <MotiView
              animate={{
                opacity: isChecked ? 1 : 0,
              }}
              transition={{
                type: 'timing',
                duration: 100,
              }}
              style={[
                styles.checkBox,
                {
                  backgroundColor: disabled ? '#cecece' : fillColor,
                },
              ]}>
              <MotiView
                animate={{
                  transform: [{scale: isChecked ? 1 : 0}],
                }}
                delay={50}
                transition={{
                  type: 'timing',
                  duration: 100,
                }}>
                <Icon name="ios-checkmark-outline" size={15} color="#fff" />
              </MotiView>
            </MotiView>
          </MotiView>
        </Pressable>
      </Box>
    );
  },
);

export default CheckBox;
