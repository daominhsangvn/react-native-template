import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FormGroupContext} from '@components/forms/Form/context';
import {useController} from 'react-hook-form';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import withTheme from '@lib/themes/withTheme';
import {StyleSheet} from 'react-native';
import Box from '@components/layouts/Box';
import {rem} from '@lib/themes/utils';

const RadioGroup = ({theme, options, horizontal = false}) => {
  const {light, dark, scheme, styles} = theme;
  const [selectedValue, setSelectedValue] = useState(null);
  const {control, name, disabled} = React.useContext(FormGroupContext);

  const fillColor = useMemo(() => {
    return scheme === 'dark' ? dark.CHECKBOX.primary : light.CHECKBOX.primary;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheme]);

  const {
    field: {onChange, name: Name, value, ref},
    fieldState: {isTouched, isDirty},
  } = useController({
    name,
    control,
  });

  const data = useMemo(() => {
    return options.map(op => ({
      id: op.value,
      size: 25,
      fillColor,
      unfillColor: 'transparent',
      textStyle: {
        textDecorationLine: 'none',
      },
      activeOpacity: 1,
      text: op.label,
      style: {marginBottom: rem(0.5), marginLeft: rem(0.5)},
    }));
  }, [fillColor, options]);

  const onValueChange = useCallback(
    selectedItem => {
      setSelectedValue(selectedItem.id);
      onChange(selectedItem.id);
    },
    [onChange, setSelectedValue],
  );

  useEffect(() => {
    if (!isDirty && value && data) {
      const itemIndex = data.findIndex(o => o.id === value);
      if (itemIndex !== -1) {
        setSelectedValue(data[itemIndex].id);
      }
    }
  }, [isDirty, value, data]);

  return (
    <Box style={styles.container}>
      <BouncyCheckboxGroup
        data={data}
        initial={selectedValue}
        style={{flexDirection: horizontal ? 'row' : 'column'}}
        onChange={onValueChange}
      />
    </Box>
  );
};

export default withTheme(RadioGroup, () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  }),
);
