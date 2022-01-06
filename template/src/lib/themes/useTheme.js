import React, {useContext} from 'react';
import {ThemeContext} from './context';

const useTheme = () => {
  const theme = useContext(ThemeContext);

  return theme;
};

export default useTheme;
