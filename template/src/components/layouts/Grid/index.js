import React, {useCallback, useEffect, useState} from 'react';
import GridItem from './Item';
import Box from '../Box';
import {StyleSheet} from 'react-native';
import {rem} from '@lib/themes/utils';

const Grid = ({children, cols = 1, gap = rem(1), ...rest}) => {
  const [width, setWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const onLayout = useCallback(event => {
    const {layout} = event.nativeEvent;
    setWidth(layout.width);
  }, []);

  useEffect(() => {
    setItemWidth((width - gap * (cols - 1)) / cols);
  }, [width, cols, gap]);

  return (
    <Box style={styles.container} onLayout={onLayout} {...rest}>
      {!Array.isArray(children) && children}
      {Array.isArray(children) &&
        Array.from(Array(cols)).map((_, ind) => {
          return (
            <Box
              key={ind}
              style={{width: itemWidth, marginLeft: ind > 0 ? gap : 0}}>
              {children[ind]}
            </Box>
          );
        })}
    </Box>
  );
};

Grid.Item = GridItem;

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
});

export default Grid;
