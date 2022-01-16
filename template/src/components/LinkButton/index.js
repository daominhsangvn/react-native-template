import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeValue from '@lib/themes/useSchemeValue';
import ThemeStyles from '@configs/themes/styles';

const LinkButton = ({children, textStyle, style, ...rest}) => {
  const textColorValue = useSchemeValue('BUTTON.link');

  return (
    <TouchableOpacity {...rest} style={mergeStyles({}, style)}>
      {typeof children === 'string' && (
        <Text
          style={mergeStyles(
            ThemeStyles.btn_link,
            {color: textColorValue},
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
