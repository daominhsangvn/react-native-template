import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackChevronIcon from '../../assets/svg/back-chevron.svg';
import HeaderButton from '@components/Header/Button';

const Header = props => {
  const {back, navigation, options, route} = props;
  // console.log('Header Props', props);

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
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 11,
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 2, y: 2}}
        colors={['#FD7292', '#FD5E2C']}
        style={[StyleSheet.absoluteFillObject, {height: 50}]}
      />

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
              <BackChevronIcon width={20} height={20} />
            </HeaderButton>
          )}
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
