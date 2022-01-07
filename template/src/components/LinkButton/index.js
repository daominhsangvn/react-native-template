import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeValue from '@lib/themes/useSchemeValue';

const LinkButton = ({children, textStyle, style, ...rest}) => {
  const textColorValue = useSchemeValue('BUTTON.link');

  return (
    <TouchableOpacity {...rest} style={mergeStyles({}, style)}>
      {typeof children === 'string' && (
        <Text
          style={mergeStyles(
            {fontWeight: '600', color: textColorValue},
            textStyle,
          )}>
          {children}
        </Text>
      )}
      {typeof children !== 'string' && children}
    </TouchableOpacity>
  );
};

export default LinkButton;
