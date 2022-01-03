import React, {useCallback} from 'react';
import {Picker} from '@react-native-picker/picker';

const SelectPicker = ({onChange, value, options}) => {
	const {value, children, onChange, options} = props;
	const pickerRef = useRef();

	const show = useCallback(() => {
		pickerRef.current?.focus();
	}, []);

	useImperativeHandle(ref, () => {
		return {
			show
		}
	});

	return (<Picker
	    ref={pickerRef}
	    onValueChange={onChange}
	    mode="dialog"
	    selectedValue={value}
	    style={{position: 'absolute', left: windowWidth + 100}}>
	    {options.map(op => (
	      <Picker.Item
	        label={op.label}
	        value={op.value}
	        key={op.value}
	        color={value === op.value ? 'red' : 'black'}
	      />
	    ))}
	</Picker>)
};

export default SelectPicker;