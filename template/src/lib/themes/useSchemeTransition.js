import React from 'react';
import {useSelector} from 'react-redux';
import {selectThemeScheme} from '@lib/themes/store';
import {useDerivedValue, withTiming} from 'react-native-reanimated';
import {INTERPOLATE_COLOR_DURATION} from '@configs/themes/var';

const useSchemeTransition = () => {
  const scheme = useSelector(selectThemeScheme);

  const progress = useDerivedValue(() => {
    return scheme === 'dark'
      ? withTiming(1, {duration: INTERPOLATE_COLOR_DURATION})
      : withTiming(0, {duration: INTERPOLATE_COLOR_DURATION});
  });

  return {progress};
};

export default useSchemeTransition;
