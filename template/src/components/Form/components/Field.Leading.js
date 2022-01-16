import React, {useMemo} from 'react';
import {remScale} from '@lib/themes/utils';
import Box from '@components/layouts/Box';
import useSchemeValue from '@lib/themes/useSchemeValue';

const FieldLeading = ({children}) => {
  const inputIconColor = useSchemeValue('INPUT.icon');

  const leading = useMemo(() => {
    return (
      <Box
        style={{
          minWidth: 20,
          alignItems: 'center',
          marginRight: remScale(0.5),
        }}>
        {React.cloneElement(children, {
          color: inputIconColor,
        })}
      </Box>
    );
  }, [children, inputIconColor]);

  return leading;
};

export default FieldLeading;
