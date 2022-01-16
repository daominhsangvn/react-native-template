import React from 'react';
import {View} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {remScale} from '@lib/themes/utils';
import CardHeader from '@components/layouts/Card/Header';
import CardFooter from '@components/layouts/Card/Footer';
import CardBody from '@components/layouts/Card/Body';

const Card = ({children, style, ...rest}) => {
  return (
    <View
      style={mergeStyles(
        {
          shadowColor: '#3D52BE',
          shadowOffset: {
            width: 4,
            height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 6.68,

          elevation: 11,

          backgroundColor: '#ffffff',
          borderRadius: 8,
          margin: remScale(1),
        },
        style,
      )}
      {...rest}>
      {children}
    </View>
  );
};

Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Body = CardBody;

export default Card;
