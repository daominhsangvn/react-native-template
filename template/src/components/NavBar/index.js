import React, {useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '@components/Text';
import {HEADER_HEIGHT} from '@configs/themes/var';
import BackChevronIcon from '@assets/svg/back-chevron.svg';
import useSchemeValue from '@lib/themes/useSchemeValue';
import {rem} from '@lib/themes/utils';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {
    zIndex: 50,
  },
};

const NavBar = ({title, y}) => {
  const styles = useStyles(_styles);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const navbarColorValue = useSchemeValue('NAVBAR.background');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navBarStyle = useAnimatedStyle(() => {
    if (!y) {
      return {};
    }

    const translateY = interpolate(
      y.value,
      [0, HEADER_HEIGHT + insets.top],
      [0, -HEADER_HEIGHT - insets.top],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      transform: [{translateY}],
    };
  });

  return (
    <Animated.View
      style={[
        navBarStyle,
        StyleSheet.absoluteFill,
        styles.container,
        {
          height: HEADER_HEIGHT + insets.top,
          backgroundColor: navbarColorValue,
          paddingTop: insets.top,
        },
      ]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
        }}>
        {navigation.canGoBack() && (
          <View style={{paddingLeft: rem(1), position: 'absolute', zIndex: 20}}>
            <TouchableOpacity onPress={goBack}>
              <BackChevronIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{title}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default NavBar;
