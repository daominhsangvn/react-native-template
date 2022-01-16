import React from 'react';
import {useSelector} from 'react-redux';
import {selectThemeScheme} from '@lib/themes/store';
import useTheme from '@lib/themes/useTheme';
import get from 'lodash/get';

const useSchemeValueSwitch = (lightColor, darkColor) => {
  const scheme = useSelector(selectThemeScheme);

  return scheme === 'dark' ? darkColor : lightColor;
};

export default useSchemeValueSwitch;
