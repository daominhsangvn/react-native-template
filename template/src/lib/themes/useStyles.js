import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import useTheme from '@lib/themes/useTheme';

const useStyles = styles => {
  const theme = useTheme();
  const output = useMemo(() => {
    return StyleSheet.create(
      typeof styles === 'function' ? styles(theme) : styles,
    );
  }, [styles, theme]);
  return output;
};

export default useStyles;
