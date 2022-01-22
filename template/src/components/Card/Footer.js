import React, {useMemo} from 'react';
import Box from '@components/layouts/Box';
import useStyles from '@lib/themes/useStyles';
import ThemeStyles from '@configs/themes/styles';
import useSchemeValue from '@lib/themes/useSchemeValue';
import Text from '@components/Text';

const _styles = {
  container: {
    ...ThemeStyles.card_footer,
  },
  content: {
    ...ThemeStyles.card_footer_content,
  },
};

const CardFooter = ({children, style}) => {
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

  return (
    <Box style={[styles.container, {borderTopColor: cardColor.separator}]}>
      <Box style={[styles.content, style]}>{content}</Box>
    </Box>
  );
};

export default CardFooter;
