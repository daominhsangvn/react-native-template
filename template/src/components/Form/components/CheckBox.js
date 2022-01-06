import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Pressable, TextInput} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import useField from '@components/Form/useField';
import CheckBox from '@components/Checkbox';

const SIZE = 20;

const FormCheckBox = ({theme, style = {}, textStyle = {}, text}) => {
  const {styles} = theme;

  const {
    field: {name, onChange, ref, value},
    fieldState: {error, isDirty},
    formState: {},
    disabled,
  } = useField();

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <CheckBox
        name={name}
        ref={ref}
        onChange={onChange}
        disabled={disabled}
        checked={value}
        text={text}
        textStyle={textStyle}
      />
    </Box>
  );
};

export default withTheme(FormCheckBox, () =>
  StyleSheet.create({
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
  }),
);
