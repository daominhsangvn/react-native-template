import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import useField from '@components/Form/useField';

const FormCheckBox = ({theme, style = {}, ...props}) => {
  const {scheme, light, dark, styles} = theme;

  const {
    field: {name, onBlur, onChange, ref, value},
    fieldState: {error, invalid, isDirty, isTouched},
    formState: {},
    disabled,
  } = useField();

  const [isChecked, setIsChecked] = useState(false);

  const fillColor = useMemo(() => {
    return scheme === 'dark' ? dark.CHECKBOX.primary : light.CHECKBOX.primary;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheme]);

  const onPress = useCallback(() => {
    const val = !isChecked;
    setIsChecked(val);
    onChange(val);
  }, [isChecked, onChange]);

  useEffect(() => {
    if (!isDirty) {
      setIsChecked(value);
    }
  }, [isDirty, value]);

  return (
    <Box style={mergeStyles(styles.container, style)}>
      <BouncyCheckbox
        size={25}
        fillColor={fillColor}
        unfillColor="transparent"
        onPress={onPress}
        textStyle={{
          textDecorationLine: 'none',
        }}
        activeOpacity={1}
        style={{marginLeft: rem(0.5)}}
        disabled={disabled}
        isChecked={isChecked}
        disableBuiltInState
        name={name}
        ref={ref}
        {...props}
      />
    </Box>
  );
};

export default withTheme(FormCheckBox, () =>
  StyleSheet.create({
    container: {},
    input: {},
  }),
);
