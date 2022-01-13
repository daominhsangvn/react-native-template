import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Pressable, TextInput} from 'react-native';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import {MotiView} from 'moti';
import Icon from '@components/Icon';
import Text from '@components/Text';
import useTheme from '@lib/themes/useTheme';
import useStyles from '@lib/themes/useStyles';

const SIZE = 20;

const _styles = {
  container: {},
  input: {},
  checkBox: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    borderWidth: 1,
    borderColor: '#a9a9a9',
    backgroundColor: '#fff',
    marginRight: rem(0.5),
  },
};

const CheckBox = React.forwardRef(
  (
    {
      style = {},
      textStyle = {},
      disabled,
      onChange,
      name,
      text,
      checked,
      value,
    },
    ref,
  ) => {
    const {scheme, light, dark} = useTheme();
    const styles = useStyles(_styles);

    const [isChecked, setIsChecked] = useState(checked);

    const fillColor = useMemo(() => {
      return scheme === 'dark' ? dark.CHECKBOX.primary : light.CHECKBOX.primary;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scheme]);

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
        <Pressable onPress={onPress} style={{flexDirection: 'row'}}>
          <MotiView
            style={[
              styles.checkBox,
              disabled && {backgroundColor: '#cecece', borderColor: '#bbbbbb'},
            ]}>
            <MotiView
              animate={{
                opacity: isChecked ? 1 : 0,
              }}
              transition={{
                type: 'timing',
                duration: 100,
              }}
              style={{
                backgroundColor: disabled ? '#cecece' : fillColor,
                borderRadius: SIZE / 2,
                justifyContent: 'center',
                alignItems: 'center',
                width: SIZE,
                height: SIZE,
              }}>
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
          <Box style={{flexShrink: 1}}>
            <Text
              style={mergeStyles({marginTop: 1, lineHeight: 19}, textStyle)}>
              {text}
            </Text>
          </Box>
        </Pressable>
      </Box>
    );
  },
);

export default CheckBox;
