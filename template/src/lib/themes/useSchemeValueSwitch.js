import React from 'react';
import useTheme from '@lib/themes/useTheme';

const useSchemeValueSwitch = (lightColor, darkColor, system = false) => {
  const {scheme, deviceScheme} = useTheme();

  if (system) {
    return deviceScheme === 'dark' ? darkColor : lightColor;
  }

  return scheme === 'dark' ? darkColor : lightColor;
};

export default useSchemeValueSwitch;
