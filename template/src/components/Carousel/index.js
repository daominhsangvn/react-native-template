import React, {useCallback, useMemo, useRef} from 'react';
import {Dimensions, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Indicator from './Indicator';
import Box from '@components/layouts/Box';
import Item from './Item';

const {width} = Dimensions.get('window');

const Carousel = ({data, item_size, renderItem, middle, indicator = true}) => {
  const scrollX = useSharedValue(0);
  const position = useSharedValue(0);
  const spacer = useRef((width - item_size) / 2);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
      position.value = event.contentOffset.x / width;
    },
  });

  // return (
  //   <Box center>
  //     <Box
  //       // this will bound the size of the ScrollView to be a square because
  //       // by default, it will expand regardless if it has a flex value or not
  //       style={{width}}>
  //       <Animated.ScrollView
  //         horizontal
  //         pagingEnabled // animates ScrollView to nearest multiple of it's own width
  //         showsHorizontalScrollIndicator
  //         // the onScroll prop will pass a nativeEvent object to a function
  //         onScroll={scrollHandler} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
  //         scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
  //       >
  //         {children}
  //         {/*{photos.map((source, i) => (*/}
  //         {/*  <Box style={{margin: spacing}}>*/}
  //         {/*    <Image*/}
  //         {/*      key={i} // we will use i for the key because no two (or more) elements in an array will have the same index*/}
  //         {/*      style={{width: width - spacing * 2, height}}*/}
  //         {/*      source={source}*/}
  //         {/*    />*/}
  //         {/*  </Box>*/}
  //         {/*))}*/}
  //       </Animated.ScrollView>
  //     </Box>
  //     <Box row>
  //       {/*{photos.map((_, i) => (*/}
  //       {/*  <Indicator key={i} position={position} index={i} />*/}
  //       {/*))}*/}
  //     </Box>
  //   </Box>
  // );

  const _renderItem = useCallback(
    data => {
      const {item} = data;
      if (['left-spacer', 'right-spacer'].includes(item.key)) {
        return <View style={{width: spacer.current, height: 1}} />;
      }
      return renderItem(data);
    },
    [renderItem],
  );

  const _data = useMemo(() => {
    if (middle) {
      return [{key: 'left-spacer'}, ...data, {key: 'right-spacer'}];
    }
    return data;
  }, [middle, data]);

  return (
    <Box>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={_data}
        keyExtractor={item => item.key}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={item_size}
        decelerationRate={0.9}
        bounces={false}
        renderItem={_renderItem}
        onScroll={scrollHandler}
      />
      {indicator && (
        <Box center row>
          {data.map((_, i) => (
            <Indicator key={i} position={position} index={i} />
          ))}
        </Box>
      )}
    </Box>
  );
};

Carousel.Item = Item;

export default Carousel;
