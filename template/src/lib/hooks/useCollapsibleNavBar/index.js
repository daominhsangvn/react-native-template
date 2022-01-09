import React from 'react';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {HEADER_HEIGHT} from '@configs/themes/var';

const useCollapsibleNavBar = ({clampBound = HEADER_HEIGHT} = {}) => {
  const scrollY = useSharedValue(0);
  const scrollClamp = useSharedValue(0);

  const diffClamp = (value, lowerBound, upperBound) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      let {y} = event.contentOffset;
      if (y < 0) {
        y = 0;
      }
      const dy = y - (ctx?.prevY ?? 0);
      scrollClamp.value = diffClamp(scrollClamp.value + dy, 0, clampBound);
      // the clamp function always returns a value between 0 and 50
      ctx.prevY = y;

      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: (event, ctx) => {
      ctx.prevY = event.contentOffset.y;
    },
  });

  return {
    scrollHandler,
    scrollY,
    scrollClamp,
  };
};

export default useCollapsibleNavBar;
