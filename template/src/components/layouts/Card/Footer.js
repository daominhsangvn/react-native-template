import React from 'react';
import Box from '@components/layouts/Box';
import {rem} from '@lib/themes/utils';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
  },
  content: {
    padding: rem(1.5),
  },
};

const CardFooter = ({children, style}) => {
  const styles = useStyles(_styles);
  return (
    <Box style={styles.container}>
      <Box style={[styles.content, style]}>{children}</Box>
    </Box>
  );
};

export default CardFooter;
