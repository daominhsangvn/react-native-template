import React from 'react';
import Box from '@components/layouts/Box';

const ColItem = ({children, index, gap}) => {
  return (
    <Box
      key={index}
      style={{
        marginLeft: index > 0 ? gap : 0,
        flex: 1,
      }}>
      {children}
    </Box>
  );
};

export default ColItem;
