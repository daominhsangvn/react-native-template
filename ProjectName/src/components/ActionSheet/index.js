import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RNActionSheet from 'react-native-actions-sheet';

const ActionSheet = React.forwardRef((props, ref) => {
	const {children, ...rest} = props;
	const insets = useSafeAreaInsets();

	return (<RNActionSheet {...rest} ref={ref}>
		<View style={{paddingBottom: insets.bottom}}>{children}</View>
	</RNActionSheet>);
});

export default ActionSheet;