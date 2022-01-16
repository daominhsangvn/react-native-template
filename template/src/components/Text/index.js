import React, {useMemo} from 'react';
import {Text as RNText} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeValue from '@lib/themes/useSchemeValue';
import ThemeStyles from '@configs/themes/styles';

const Text = ({style, color, category, center, ...props}) => {
  const textColorValue = useSchemeValue('TEXT.primary');
  const textColorValue2 = useSchemeValue(`TEXT.${color}`);

  const textColor = useMemo(() => {
    if (!color) {
      return textColorValue;
    }

    if (/^#/.test(color)) {
      return color;
    }

    return textColorValue2;
  }, [color, textColorValue, textColorValue2]);

  const themeStyles = useMemo(() => {
    if (ThemeStyles[category]) {
      return ThemeStyles[category];
    }
    return {};
  }, [category]);

  return (
    <RNText
      {...props}
      style={mergeStyles(
        {color: textColor},
        center && {textAlign: 'center'},
        themeStyles,
        style,
      )}
    />
  );
};

export default Text;
