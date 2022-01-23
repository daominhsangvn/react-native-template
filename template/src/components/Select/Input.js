import React, {useEffect, useMemo, useState} from 'react';
import {Pressable} from 'react-native';
import useStyles from '@lib/themes/useStyles';
import {mergeStyles} from '@lib/utils/helpers';
import Text from '@components/Text';
import Box from '@components/layouts/Box';
import {remScale} from '@lib/themes/utils';
import useRefState from '@lib/hooks/useRefState';
import usePreviousState from '@lib/hooks/usePreviousState';

const _styles = {
  container: {},
  input: {
    height: remScale(6),
    justifyContent: 'center',
  },
  placeholder: {
    color: '#cccccc',
  },
  value: {},
};

const Input = React.forwardRef(
  ({onPress, customStyles, placeholder, selected, multi}, ref) => {
    const styles = useStyles(_styles);
    const [value, setValue, previousValue] = usePreviousState('');

    const valueComponent = useMemo(() => {
      if (value) {
        if (multi) {
          return (
            <Text style={[styles.value, customStyles.value]}>
              Selected ({value.length})
            </Text>
          );
        } else {
          return (
            <Text style={[styles.value, customStyles.value]}>{value}</Text>
          );
        }
      } else {
        return (
          <Text style={[styles.placeholder, customStyles.placeholder]}>
            {placeholder}
          </Text>
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      value,
      multi,
      customStyles.value,
      customStyles.placeholder,
      placeholder,
    ]);

    const input = useMemo(() => {
      return (
        <Pressable
          onPress={onPress}
          style={[styles.container, customStyles.inputContainer]}>
          <Box style={mergeStyles(styles.input, customStyles.input)}>
            {valueComponent}
          </Box>
        </Pressable>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      customStyles.input,
      customStyles.inputContainer,
      customStyles.placeholder,
      onPress,
      placeholder,
      valueComponent,
    ]);

    useEffect(() => {
      if (!multi) {
        if (selected.length > 0) {
          if (previousValue !== selected[0]) {
            setValue(selected[0]);
          }
        } else {
          setValue('');
        }
      } else {
        if (selected.length > 0) {
          if (previousValue !== selected) {
            setValue(selected);
          }
        } else {
          setValue('');
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multi, selected]);

    return input;
  },
);

export default Input;
