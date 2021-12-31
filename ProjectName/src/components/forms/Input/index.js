import Button from '@components/Button';
import useToggle from '@lib/hooks/useToggle';
import {rem} from '@lib/themes/utils';
import withTheme from '@lib/themes/withTheme';
import {mergeStyles} from '@lib/utils/helpers';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FormGroupContext} from '@components/forms/Form/context';
import {useController} from 'react-hook-form';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from '@components/Icon';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Input = ({
  style = {},
  inputStyle = {},
  secure = false,
  theme,
  defaultValue,
  ...rest
}) => {
  const {light, dark, styles} = theme;
  const {open, toggle} = useToggle(secure);
  const {control, name, disabled} = React.useContext(FormGroupContext);

  const {progress} = useSchemeTransition();

  const raInputStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [light.INPUT.text, dark.INPUT.text],
    );

    const placeholderTextColor = interpolateColor(
      progress.value,
      [0, 1],
      [light.INPUT.placeholder, dark.INPUT.placeholder],
    );

    return {color, placeholderTextColor};
  });

  const raIconStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [light.INPUT.icon, dark.INPUT.icon],
    );

    return {color};
  });

  const {
    field: {onChange, onBlur, name: Name, value, ref},
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });

  return (
    <View
      style={mergeStyles(styles.container, style)}
      pointerEvents={disabled ? 'none' : 'auto'}>
      <AnimatedTextInput
        {...rest}
        name={Name}
        ref={ref}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        style={[
          raInputStyle,
          ...mergeStyles(
            {
              flex: 1,
              padding: rem(0.6),
            },
            inputStyle,
          ),
        ]}
        secureTextEntry={open}
      />
      {secure && (
        <Button onPress={toggle}>
          {open ? (
            <Icon
              name="eye"
              size={rem(1.4)}
              style={[
                raIconStyle,
                {paddingLeft: rem(0.4), paddingRight: rem(0.4)},
              ]}
            />
          ) : (
            <Icon
              name="eye-off"
              size={rem(1.4)}
              style={[
                raIconStyle,
                {paddingLeft: rem(0.4), paddingRight: rem(0.4)},
              ]}
            />
          )}
        </Button>
      )}
    </View>
  );
};

export default withTheme(Input, () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  }),
);
