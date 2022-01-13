import React from 'react';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {HEADER_HEIGHT} from '@configs/themes/var';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useCollapsibleNavBar = ({clampBound} = {}) => {
  const scrollY = useSharedValue(0);
  const scrollClamp = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const diffClamp = (value, lowerBound, upperBound) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      let {y} = event.contentOffset;
      if (y < 0) {
        y = 0;
      } else {
        const dy = y - (ctx?.prevY ?? 0);
        scrollClamp.value = diffClamp(scrollClamp.value + dy, 0, !clampBound ? HEADER_HEIGHT + insets.top : clampBound);

        // the clamp function always returns a value between 0 and 50
        ctx.prevY = y;
      }
      

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
