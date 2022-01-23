import React, {
  useCallback,
  useRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import ActionSheet from '@components/ActionSheet';
import {Picker} from '@react-native-picker/picker';
import useRefState from '@lib/hooks/useRefState';
import useSchemeValue from '@lib/themes/useSchemeValue';
import Box from '@components/layouts/Box';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {height: 200},
};

const SimpleSelect = React.forwardRef((props, ref) => {
  const styles = useStyles(_styles);
  const {value, onChange, options, color = 'primary'} = props;
  const actionSheetRef = useRef();

  const [selectedValue, setSelectedValue] = useRefState(value);

  const selectColor = useSchemeValue(`SELECT.${color}`, true);

  const handleOnChange = useCallback((selectedItemValue, index) => {
    onChange([selectedItemValue]);
    setSelectedValue(selectedItemValue);
  }, []);

  const show = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      show,
    };
  });

  useEffect(() => {
    if (value) {
      setSelectedValue(value[0]);
    } else {
      setSelectedValue(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  console.log('selectedValue', selectedValue);

  return (
    <ActionSheet ref={actionSheetRef}>
      <Box style={styles.container}>
        <Picker onValueChange={handleOnChange} selectedValue={selectedValue}>
          {options.map(op => (
            <Picker.Item
              label={op.label}
              value={op.value}
              key={op.value}
              color={
                selectedValue === op.value
                  ? selectColor.selected.text
                  : selectColor.text
              }
            />
          ))}
        </Picker>
      </Box>
    </ActionSheet>
  );
});

export default SimpleSelect;
