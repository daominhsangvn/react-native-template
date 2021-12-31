import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectIsThemeAuto, selectThemeScheme} from '@lib/themes/store';
import {useColorScheme} from 'react-native';
import lightTheme from '../../configs/themes/light';
import darkTheme from '../../configs/themes/dark';
import {ThemeContext} from './context';
import {COLORS} from '@configs/themes/var';

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

const ThemeProvider = ({children}) => {
  const scheme = useColorScheme();
  const autoTheme = useSelector(selectIsThemeAuto);
  const schemeTheme = useSelector(selectThemeScheme);
  // const defaultTheme = autoTheme ? themes[scheme] : themes[schemeTheme];
  // const [theme, setTheme] = useState(defaultTheme);

  // useEffect(() => {
  //   setTheme(autoTheme ? themes[scheme] : themes[schemeTheme]);
  // }, [autoTheme, scheme, schemeTheme]);

  return (
    <ThemeContext.Provider
      value={{
        dark: darkTheme,
        light: lightTheme,
        scheme: autoTheme ? scheme : schemeTheme,
        COLORS,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
