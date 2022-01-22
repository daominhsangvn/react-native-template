import React, {useMemo} from 'react';
import Box from '@components/layouts/Box';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BOTTOM_TAB_HEIGHT} from '@configs/themes/var';

const SafeGap = ({bottom = false}) => {
  const insets = useSafeAreaInsets();
  const height = useMemo(() => {
    if (bottom) {
      return insets.bottom + BOTTOM_TAB_HEIGHT;
    }
    return insets.top;
  }, [bottom]);
  return <Box style={{height}} />;
};

export default SafeGap;
