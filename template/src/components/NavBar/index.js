import React, {useCallback} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import Text from '@components/Text';
import Button from '@components/Button';
import {HEADER_HEIGHT} from '@configs/themes/var';
import BackChevronIcon from '@assets/svg/back-chevron.svg';

const NavBar = ({theme, title, y}) => {
  const {styles} = theme;
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navBarStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      y.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      transform: [{translateY}],
    };
  });

  return (
    <SafeAreaView>
      <Animated.View
        style={[navBarStyle, StyleSheet.absoluteFill, styles.container]}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{width: 50, position: 'absolute'}}>
            <Button transparent onPress={goBack}>
              <BackChevronIcon width={20} height={20} />
            </Button>
          </View>
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
    </SafeAreaView>
  );
};

export default withTheme(NavBar, () =>
  StyleSheet.create({
    container: {
      height: HEADER_HEIGHT,
      backgroundColor: 'red',
      zIndex: 50,
    },
  }),
);
