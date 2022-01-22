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
    position: 'relative',
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
  (
    {
      style = {},
      customStyles = {},
      icon,
      disabled,
      onChange,
      name,
      checked,
      value,
      color = 'primary',
    },
    ref,
  ) => {
    const styles = useStyles(_styles);

    const [isChecked, setIsChecked] = useState(checked);
    const checkBoxColor = useSchemeValue(`CHECKBOX.${color}`);

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
                backgroundColor: checkBoxColor.uncheck.background,
                borderColor: checkBoxColor.uncheck.border,
              },
              disabled && {
                backgroundColor: checkBoxColor.disabled.background,
                borderColor: checkBoxColor.disabled.border,
              },
              customStyles.container,
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
                customStyles.checkbox,
                {
                  backgroundColor: disabled
                    ? checkBoxColor.disabled.background
                    : checkBoxColor.checked.background,
                  borderColor: disabled
                    ? checkBoxColor.disabled.border
                    : checkBoxColor.checked.border,
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
                {icon ? (
                  React.cloneElement(icon, {color: checkBoxColor.icon.color})
                ) : (
                  <Icon
                    name="ios-checkmark-outline"
                    size={15}
                    color={checkBoxColor.icon.color}
                  />
                )}
              </MotiView>
            </MotiView>
          </MotiView>
        </Pressable>
      </Box>
    );
  },
);

export default CheckBox;
