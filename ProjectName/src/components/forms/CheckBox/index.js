import React, {useCallback, useMemo} from 'react';
import {FormGroupContext} from '@components/forms/Form/context';
import {useController} from 'react-hook-form';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import withTheme from '@lib/themes/withTheme';
import {StyleSheet} from 'react-native';
import Box from '@components/layouts/Box';
import {rem} from '@lib/themes/utils';

const CheckBox = ({theme, ...props}) => {
  const {light, dark, scheme, styles} = theme;

  const {control, name, disabled} = React.useContext(FormGroupContext);

  const fillColor = useMemo(() => {
    return scheme === 'dark' ? dark.CHECKBOX.primary : light.CHECKBOX.primary;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheme]);

  const {
    field: {onChange},
  } = useController({
    name,
    control,
  });

  const onPress = useCallback(
    checked => {
      onChange(checked);
    },
    [onChange],
  );

  return (
    <Box style={styles.container}>
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
        {...props}
      />
    </Box>
  );
};

export default withTheme(CheckBox, () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  }),
);
