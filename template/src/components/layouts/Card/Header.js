import React from 'react';
import Box from '@components/layouts/Box';
import {rem} from '@lib/themes/utils';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  content: {
    padding: rem(1.5),
  },
};

const CardHeader = ({children, style}) => {
  const styles = useStyles(_styles);
  return (
    <Box style={styles.container}>
      <Box style={[styles.content, style]}>{children}</Box>
    </Box>
  );
};

export default CardHeader;
