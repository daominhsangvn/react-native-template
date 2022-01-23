import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';
import {selectIsThemeAuto, selectThemeScheme} from '@lib/themes/store';
import {StatusBar, useColorScheme} from 'react-native';
import lightTheme from '../../configs/themes/light';
import darkTheme from '../../configs/themes/dark';
import {ThemeContext} from './context';
import {COLORS} from '@configs/themes/var';
import Logger from '@lib/utils/Logger';

const ThemeProvider = ({children}) => {
  const deviceScheme = useColorScheme();
  const autoTheme = useSelector(selectIsThemeAuto);
  const themeScheme = useSelector(selectThemeScheme);

  const scheme = useMemo(() => {
    return autoTheme ? deviceScheme : themeScheme;
  }, [autoTheme, deviceScheme, themeScheme]);

  useEffect(() => {
    if (scheme === 'dark') {
      StatusBar.setBarStyle(
        Platform.select({android: 'dark-content', ios: 'light-content'}),
      );
    } else {
      StatusBar.setBarStyle(
        Platform.select({android: 'light-content', ios: 'dark-content'}),
      );
    }
  }, []);

  useEffect(() => {
    Logger.log('autoTheme', autoTheme);
    Logger.log('scheme', scheme);
    if (scheme === 'dark') {
      StatusBar.setBarStyle(
        Platform.select({android: 'dark-content', ios: 'light-content'}),
      );
    } else {
      StatusBar.setBarStyle(
        Platform.select({android: 'light-content', ios: 'dark-content'}),
      );
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
