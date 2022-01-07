import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackChevronIcon from '../../assets/svg/back-chevron.svg';
import HeaderButton from '@components/Header/Button';
import {HEADER_HEIGHT} from '@configs/themes/var';
import useSchemeValue from '@lib/themes/useSchemeValue';

const Header = props => {
  const {back, navigation, options, route} = props;
  // console.log('Header Props', props);

  const insets = useSafeAreaInsets();

  const backgroundColorValue = useSchemeValue('BACKGROUND.primary');
  const headerColorValue = useSchemeValue('HEADER.color');

  const _title = useMemo(() => {
    if (typeof options.headerTitle === 'string' || !options.headerTitle) {
      return (
        <Text style={{fontSize: 18, color: 'white'}}>
          {options.headerTitle || route.name}
        </Text>
      );
    }

    return options.headerTitle(props);
  }, [options.headerTitle, route.name]);

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: backgroundColorValue,
        height: HEADER_HEIGHT,
      }}>
      {/*<LinearGradient*/}
      {/*  start={{x: 0, y: 0}}*/}
      {/*  end={{x: 2, y: 2}}*/}
      {/*  colors={['#FD7292', '#FD5E2C']}*/}
      {/*  style={[*/}
      {/*    StyleSheet.absoluteFillObject,*/}
      {/*    {height: HEADER_HEIGHT + insets.top},*/}
      {/*  ]}*/}
      {/*/>*/}

      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{width: 50}}>
          {back && (
            <HeaderButton onPress={() => navigation.pop()}>
              <BackChevronIcon
                width={20}
                height={20}
                fill={headerColorValue}
              />
            </HeaderButton>
          )}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            color: headerColorValue,
          }}>
          {_title}
        </View>
        <View style={{width: 50, alignItems: 'flex-end'}}>
          {options && options.headerRight && options.headerRight(props)}
        </View>
      </View>
    </View>
  );
};

export default Header;
