import React from 'react';
import {StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {rem} from '@lib/themes/utils';
import {FormGroupContext} from '@components/forms/Form/context';
import {useController} from 'react-hook-form';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

const Label = ({children, theme}) => {
  const {control, name} = React.useContext(FormGroupContext);
  const {light, dark, styles} = theme;

  const {
    fieldState: {error},
  } = useController({name, control});

  const {progress} = useSchemeTransition();

  const raTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [
        error ? light.INPUT.label_error : light.INPUT.label,
        error ? dark.INPUT.label_error : dark.INPUT.label,
      ],
    );

    return {color};
  });

  return (
    <Animated.Text style={[raTextStyle, styles.label]}>
      {children}
    </Animated.Text>
  );
};

export default withTheme(Label, () =>
  StyleSheet.create({
    label: {
      fontWeight: '600',
      letterSpacing: 0.27,
      fontSize: rem(1.2),
      marginBottom: rem(0.4),
    },
  }),
);
