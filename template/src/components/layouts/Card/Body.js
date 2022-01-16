import React from 'react';
import Box from '@components/layouts/Box';
import useStyles from '@lib/themes/useStyles';
import {remScale} from '@lib/themes/utils';

const _styles = {
  container: {
    padding: remScale(1.5),
  },
};

const CardBody = ({children, style}) => {
  const styles = useStyles(_styles);
  return <Box style={[styles.container, style]}>{children}</Box>;
};

export default CardBody;
