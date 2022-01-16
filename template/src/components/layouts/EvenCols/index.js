import React from 'react';
import ColItem from './Item';
import Box from '../Box';
import {StyleSheet} from 'react-native';
import {remScale} from '@lib/themes/utils';

const EvenCols = ({children, cols = 1, gap = remScale(1), ...rest}) => {
  return (
    <Box style={styles.container} {...rest}>
      {!Array.isArray(children) && children}
      {Array.isArray(children) &&
        Array.from(Array(cols)).map((_, ind) => {
          return React.cloneElement(children[ind], {index: ind, gap, key: ind});
        })}
    </Box>
  );
};

EvenCols.Item = ColItem;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flex: 1},
});

export default EvenCols;
