import React from 'react';
import {StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Text from '@components/Text';
import Screen from '@components/layouts/Screen';
import Button from '@components/Button';
import {rem} from '@lib/themes/utils';
import Gap from '@components/Gap';
import NavBar from '@components/NavBar';

const HomeScreen = ({navigation}) => {
  return (
    <Screen navbar style={{padding: rem(1)}}>
      <NavBar title="Home" />
      <Text>hello i'm home</Text>

      <Gap v={1} />

      <Button onPress={() => navigation.navigate('Sample')}>
        To Sample Screen
      </Button>
    </Screen>
  );
};

export default withTheme(HomeScreen, () => StyleSheet.create({}));
