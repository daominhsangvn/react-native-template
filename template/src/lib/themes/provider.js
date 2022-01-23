import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {selectIsThemeAuto, selectThemeScheme} from '@lib/themes/store';
import {StatusBar, useColorScheme} from 'react-native';
import lightTheme from '../../configs/themes/light';
import darkTheme from '../../configs/themes/dark';
import {ThemeContext} from './context';
import {COLORS} from '@configs/themes/var';

const ThemeProvider = ({children}) => {
  const deviceScheme = useColorScheme();
  const autoTheme = useSelector(selectIsThemeAuto);
  const themeScheme = useSelector(selectThemeScheme);

  const scheme = useMemo(() => {
    return autoTheme ? deviceScheme : themeScheme;
  }, [autoTheme, deviceScheme, themeScheme]);

  useEffect(() => {
    if (scheme === 'dark') {
      StatusBar.setBarStyle('dark-content');
    } else {
      StatusBar.setBarStyle('light-content');
    }
  }, []);

  useEffect(() => {
    if (scheme === 'dark') {
      StatusBar.setBarStyle('dark-content');
    } else {
      StatusBar.setBarStyle('light-content');
    }
  }, [scheme]);

  return (
    <ThemeContext.Provider
      value={{
        dark: darkTheme,
        light: lightTheme,
        scheme,
        deviceScheme,
        COLORS,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
