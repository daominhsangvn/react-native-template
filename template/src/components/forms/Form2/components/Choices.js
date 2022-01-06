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
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';

const Form2Choices = ({theme, style = {}, options, horizontal = false}) => {
  const {scheme, light, dark, styles} = theme;
  const {isDirty, value, onChange} = useContext(Form2FieldContext);

  const [selectedValue, setSelectedValue] = useState(null);

  const fillColor = useMemo(() => {
    return scheme === 'dark' ? dark.CHECKBOX.primary : light.CHECKBOX.primary;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheme]);

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
    <Box style={mergeStyles(styles.container, style)}>
      <BouncyCheckboxGroup
        data={data}
        initial={selectedValue}
        style={{flexDirection: horizontal ? 'row' : 'column'}}
        onChange={onValueChange}
      />
    </Box>
  );
};

export default withTheme(Form2Choices, () =>
  StyleSheet.create({
    container: {},
    input: {},
  }),
);
