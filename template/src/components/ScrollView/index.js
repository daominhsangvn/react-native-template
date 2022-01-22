import React, {useMemo} from 'react';
import {mergeStyles} from '@lib/utils/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import {BOTTOM_TAB_HEIGHT, HEADER_HEIGHT} from '@configs/themes/var';

const ScrollView = ({
  contentContainerStyle = {},
  safe,
  grow,
  navbar,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  const paddingBottom = useMemo(() => {
    let value =
      insets.bottom +
      (contentContainerStyle.padding ||
        contentContainerStyle.paddingBottom ||
        contentContainerStyle.paddingHorizontal ||
        0);

    if (safe === true || safe === 'bottom') {
      value = value + BOTTOM_TAB_HEIGHT;
    }

    return value;
  }, [safe, contentContainerStyle, insets]);

  const paddingTop = useMemo(() => {
    let value =
      contentContainerStyle.padding ||
      contentContainerStyle.paddingTop ||
      contentContainerStyle.paddingVertical ||
      0;
    if (safe === true || safe === 'top') {
      value = value + insets.top;
    }
    if (navbar) {
      value = value + HEADER_HEIGHT;
    }

    return value;
  }, [insets, contentContainerStyle, safe]);

  return (
    <Animated.ScrollView
      {...props}
      scrollEventThrottle={1}
      contentContainerStyle={mergeStyles(
        contentContainerStyle,
        {
          paddingTop,
          paddingBottom,
        },
        grow && {flexGrow: 1},
      )}
    />
  );
};

export default ScrollView;
