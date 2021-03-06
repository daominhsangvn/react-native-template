import React, {useCallback, useRef, useImperativeHandle} from 'react';
import {View} from 'react-native';
import ActionSheet from '@components/ActionSheet';
import {Picker} from '@react-native-picker/picker';

const SelectPicker = React.forwardRef((props, ref) => {
  const {value, onChange, options} = props;
  const actionSheetRef = useRef();

  const show = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      show,
    };
  });

  return (
    <ActionSheet ref={actionSheetRef}>
      <View style={{height: 200}}>
        <Picker onValueChange={onChange} selectedValue={value}>
          {options.map(op => (
            <Picker.Item
              label={op.label}
              value={op.value}
              key={op.value}
              color={value === op.value ? 'red' : 'black'}
            />
          ))}
        </Picker>
      </View>
    </ActionSheet>
  );
});

export default SelectPicker;
