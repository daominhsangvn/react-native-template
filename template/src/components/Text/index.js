import React, {useMemo} from 'react';
import {Text as RNText} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeValue from '@lib/themes/useSchemeValue';

const Text = ({style, color, center, ...props}) => {
  const textColorValue = useSchemeValue('TEXT.default');
  const textColorValue2 = useSchemeValue(`TEXT.${color}`);

  const textColor = useMemo(() => {
    if (!color) {
      return textColorValue;
    }

    return textColorValue2;
  }, [color, textColorValue, textColorValue2]);

  return (
    <RNText
      {...props}
      style={mergeStyles(
        {color: textColor},
        center && {textAlign: 'center'},
        style,
      )}
    />
  );
};

export default Text;
