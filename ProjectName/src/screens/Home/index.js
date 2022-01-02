import React from 'react';
import {StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Text from '@components/Text';
import Screen from '@components/layouts/Screen';
import Button from '@components/Button';
import {rem} from '@lib/themes/utils';
import Gap from '@components/Gap';

const HomeScreen = ({navigation}) => {
  return (
    <Screen style={{padding: rem(1)}}>
      <Text>hello i'm home</Text>

      <Gap v={1} />

      <Button onPress={() => navigation.navigate('Sample')}>
        To Sample Screen
      </Button>

      <Gap v={1} />

      <Button onPress={() => navigation.navigate('Sample2')}>
        To Sample 2 Screen
      </Button>
    </Screen>
  );
};

export default withTheme(HomeScreen, () => StyleSheet.create({}));
