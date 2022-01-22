import React from 'react';
import Screen from '@components/layouts/Screen';
import NavBar from '@components/NavBar';
import ScrollView from '@components/ScrollView';
import useStyles from '@lib/themes/useStyles';
import {remScale} from '@lib/themes/utils';
import Text from '@components/Text';

const _styles = {
  container: {
    padding: remScale(2),
  },
};

const Tab1aScreen = () => {
  const styles = useStyles(_styles);
  return (
    <Screen navbar safe>
      <NavBar title="Tab 1 A" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text center>TAB 1 A</Text>
      </ScrollView>
    </Screen>
  );
};

export default Tab1aScreen;
