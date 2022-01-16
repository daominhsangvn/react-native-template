import React from 'react';
import Text from '@components/Text';
import Screen from '@components/layouts/Screen';
import Button from '@components/Button';
import {remScale} from '@lib/themes/utils';
import Gap from '@components/Gap';
import NavBar from '@components/NavBar';

const HomeScreen = ({navigation}) => {
  return (
    <Screen navbar style={{padding: remScale(1)}}>
      <NavBar title="Home" />
      <Text>hello i'm home</Text>

      <Gap v={1} />

      <Button onPress={() => navigation.navigate('Sample')}>
        To Sample Screen
      </Button>
    </Screen>
  );
};

export default HomeScreen;
