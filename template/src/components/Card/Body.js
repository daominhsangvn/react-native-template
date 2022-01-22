import React, {useMemo} from 'react';
import Box from '@components/layouts/Box';
import useStyles from '@lib/themes/useStyles';
import ThemeStyles from '@configs/themes/styles';
import Text from '@components/Text';
import useSchemeValue from '@lib/themes/useSchemeValue';

const _styles = {
  container: {
    ...ThemeStyles.card_body_content,
  },
};

const CardBody = ({children, style}) => {
  const styles = useStyles(_styles);
  const cardColor = useSchemeValue('CARD.primary');
  const content = useMemo(() => {
    if (typeof children === 'function') {
      return children({textColor: cardColor.text.color});
    }
    if (typeof children === 'object') {
      return React.cloneElement(children, {color: cardColor.text.color});
    }
    return <Text color={cardColor.text.color}>{children}</Text>;
  }, [children, cardColor]);

  return <Box style={[styles.container, style]}>{content}</Box>;
};

export default CardBody;
