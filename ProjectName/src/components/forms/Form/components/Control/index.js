import Box from '@components/layouts/Box';
import withTheme from '@lib/themes/withTheme';
import React from 'react';
import {StyleSheet} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {FormGroupContext} from '@components/forms/Form/context';
import {useController} from 'react-hook-form';
import useSchemeTransition from '@lib/themes/useSchemeTransition';
import {interpolateColor, useAnimatedStyle} from 'react-native-reanimated';
import Text from '@components/Text';

const Control = ({children, leading, trailing, theme, containerStyle = {}}) => {
  const {light, dark, styles} = theme;
  const {control, name, disabled} = React.useContext(FormGroupContext);

  const {
    fieldState: {error},
  } = useController({name, control});

  const {progress} = useSchemeTransition();

  const raStyle = useAnimatedStyle(() => {
    const borderBottomColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        error ? light.INPUT.border_error : light.INPUT.border,
        error ? dark.INPUT.border_error : dark.INPUT.border,
      ],
    );

    return {borderBottomColor};
  });

  return (
    <Box
      style={[
        raStyle,
        ...mergeStyles(
          {
            opacity: disabled ? 0.5 : 1,
          },
          styles.container,
          containerStyle,
        ),
      ]}>
      <Text>
        {leading &&
          React.cloneElement(leading, {
            color: [light.INPUT.icon, dark.INPUT.icon],
          })}
      </Text>
      <Box style={{flex: 1}}>{children}</Box>
      {trailing &&
        React.cloneElement(trailing, {
          color: [light.INPUT.icon, dark.INPUT.icon],
        })}
    </Box>
  );
};

export default withTheme(Control, () =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
    },
  }),
);
