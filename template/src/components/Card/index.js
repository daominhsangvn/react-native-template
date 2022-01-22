import React from 'react';
import {View} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import CardHeader from '@components/Card/Header';
import CardFooter from '@components/Card/Footer';
import CardBody from '@components/Card/Body';
import useStyles from '@lib/themes/useStyles';
import ThemeStyles from '@configs/themes/styles';
import useSchemeValue from '@lib/themes/useSchemeValue';

const _styles = {
  container: {
    ...ThemeStyles.card,
  },
};

const Card = ({children, style, ...rest}) => {
  const styles = useStyles(_styles);
  const cardColor = useSchemeValue('CARD.primary');
  return (
    <View
      style={mergeStyles(
        styles.container,
        {
          backgroundColor: cardColor.background,
          shadowColor: cardColor.shadowColor,
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
