import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RNActionSheet from 'react-native-actions-sheet';
import Box from '@components/layouts/Box';

const ActionSheet = React.forwardRef((props, ref) => {
  const {children, ...rest} = props;
  const insets = useSafeAreaInsets();

  return (
    <RNActionSheet {...rest} ref={ref}>
      <Box style={{paddingBottom: insets.bottom}}>{children}</Box>
    </RNActionSheet>
  );
});

export default ActionSheet;
