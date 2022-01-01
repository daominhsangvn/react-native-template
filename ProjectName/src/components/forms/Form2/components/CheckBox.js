import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {Form2FieldContext} from '@components/forms/Form2/FieldContext';
import Box from '@components/layouts/Box';
import {mergeStyles} from '@lib/utils/helpers';
import {rem} from '@lib/themes/utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Form2CheckBox = ({theme, style = {}, ...props}) => {
  const {scheme, light, dark, styles} = theme;
  const {isDirty, value, onChange, disabled} = useContext(Form2FieldContext);
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
      console.log('useEffect setIsChecked()', value);
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
        {...props}
      />
    </Box>
  );
};

export default withTheme(Form2CheckBox, () =>
  StyleSheet.create({
    container: {},
    input: {},
  }),
);
