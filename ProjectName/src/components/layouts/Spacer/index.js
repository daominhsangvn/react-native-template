import React from 'react';
import {View} from 'react-native';
import {rem} from '@lib/themes/utils';

const Spacer = ({children, horizontal = false, spacing = 1, ...rest}) => {
  return (
    <View {...rest}>
      {Array.isArray(children) && spacing > 0
        ? React.Children.map(children, (child, idx) => {
            if (child && idx === children.length - 1) {
              return React.cloneElement(child);
            } else if (child) {
              return (
                <>
                  {React.cloneElement(child)}
                  {!!children[idx + 1] && (
                    <View style={{height: rem(spacing)}} />
                  )}
                </>
              );
            }
          })
        : children}
    </View>
  );
};

export default Spacer;
