import React from 'react';
import {useSelector} from 'react-redux';
import {selectThemeScheme} from '@lib/themes/store';
import useTheme from '@lib/themes/useTheme';
import get from 'lodash/get';

const useSchemeValue = path => {
  const scheme = useSelector(selectThemeScheme);
  const {light, dark} = useTheme();

  return scheme === 'dark' ? get(dark, path) : get(light, path);
};

export default useSchemeValue;
