import React, {useMemo} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Box from '@components/layouts/Box';
import LottieView from 'lottie-react-native';
import Spacer from '@components/layouts/Spacer';
import Button from '@components/Button';
import {rem} from '@lib/themes/utils';

const alertConfig = {
  error: {
    source: require('@assets/lotties/error.json'),
    iconSize: 80,
    title: 'Error',
    titleColor: '#de0000',
  },
  success: {
    source: require('@assets/lotties/success.json'),
    iconSize: 80,
    title: 'Success',
    titleColor: '#00c501',
  },
  warning: {
    source: require('@assets/lotties/warning.json'),
    iconSize: 90,
    title: 'Warning',
    titleColor: '#e37e00',
  },
};

const Alert = gestureHandlerRootHOC(({config, onPress}) => {
  const {type, message} = config;

  const alert = useMemo(() => {
    return alertConfig[type];
  }, [type]);

  return (
    <Box style={styles.container}>
      <SafeAreaView style={styles.contain}>
        <Box style={styles.header}>
          <View style={styles.header__box}>
            <View style={styles.header__box__borderIcon} />
            <View style={styles.header__box__backgroundIcon} />
            <LottieView
              source={alert.source}
              autoPlay
              loop={false}
              speed={1.5}
              style={[
                styles.header__box__icon,
                {
                  width: alert.iconSize,
                  height: alert.iconSize,
                },
              ]}
            />
          </View>
        </Box>
        <Spacer spacing={1} style={styles.content}>
          <Text style={[styles.content__title, {color: alert.titleColor}]}>
            {alert.title}
          </Text>
          <Text style={styles.content_description}>{message}</Text>
          <View style={styles.content_buttonContain}>
            <Button
              textStyle={styles.content_buttonContain__button}
              onPress={onPress}>
              Close
            </Button>
          </View>
        </Spacer>
      </SafeAreaView>
    </Box>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 10,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  contain: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: rem(1),
    paddingVertical: rem(1),
    borderRadius: rem(0.5),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  content__title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: rem(1),
    color: '#282828',
  },
  content_description: {
    textAlign: 'center',
    paddingHorizontal: rem(1),
    color: '#464646',
  },
  header: {
    position: 'absolute',
    top: 0,
  },
  header__box: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header__box__borderIcon: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderColor: '#ffffff',
    borderWidth: 4,
    borderRadius: 35,
    zIndex: 1,
  },
  header__box__backgroundIcon: {
    position: 'absolute',
    width: 70,
    height: 70,
    backgroundColor: '#ffffff',
    borderRadius: 35,
    zIndex: -1,
  },
  header__box__icon: {
    position: 'absolute',
  },
  content_buttonContain: {
    width: '100%',
    alignSelf: 'center',
    marginTop: rem(1),
  },
  content_buttonContain__button: {
    color: '#ffffff',
  },
});

export default Alert;
