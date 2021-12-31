import Button from '@components/Button';
import Form from '@components/forms/Form';
import Input from '@components/forms/Input';
import LinkButton from '@components/forms/LinkButton';
import Box from '@components/layouts/Box';
import Screen from '@components/layouts/Screen';
import Spacer from '@components/layouts/Spacer';
import {
  selectError,
  selectIsLoading,
} from '@features/authentication/store/sign-in/slice';
import {selectIsAuth} from '@features/authentication/store/user/slice';
import useAlertDiaLog from '@lib/alertDialog/useAlertDialog';
import {rem} from '@lib/themes/utils';
import withTheme from '@lib/themes/withTheme';
import React, {useCallback, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {yupResolver} from '@lib/utils/yupResolver';
import {CommonActions} from '@react-navigation/native';
import Logo from '@assets/svg/logo.svg';
import {toggleScheme} from '@lib/themes/store';
import Icon from '@components/Icon';
import Form2Field from '@components/forms/Form2/Field';
import Form2TextInput from '@components/forms/Form2/components/TextInput';
import Form2 from '@components/forms/Form2';
import Gap from '@components/Gap';
import Text from '@components/Text';

let schema = yup.object().shape({
  email: yup.string().required().email().min(6).max(50),
  password: yup.string().required().min(6).max(20),
});

const SignInScreen = ({theme, navigation}) => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {styles} = theme;
  const {showError} = useAlertDiaLog();

  const resetRouteToHome = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'App'}],
        state: {routes: [{name: 'Home'}]},
      }),
    );
  }, [navigation]);

  useEffect(() => {
    if (isAuth) {
      resetRouteToHome();
    }
  }, [isAuth, resetRouteToHome]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [showError, error]);

  const onSubmit = data => {
    resetRouteToHome();
  };

  const forgotPassword = useCallback(() => {}, []);

  const signup = useCallback(() => {}, []);

  const formRef = useRef();

  return (
    <Screen style={styles.container}>
      <Box center style={{marginVertical: rem(2)}}>
        <Logo width={100} height={100} />
      </Box>

      <Form2
        ref={formRef}
        defaultValues={{
          email: 'sang.dao@newoceaninfosys.com',
          password: '123456789',
        }}
        schema={schema}
        onSubmit={onSubmit}>
        <Spacer spacing={2}>
          <Form2Field
            name="email"
            label="Email"
            leading={<Icon name="mail" size={rem(1.4)} />}>
            <Form2TextInput placeholder="Your email" />
          </Form2Field>

          <Box>
            <Form2Field
              name="password"
              label="Password"
              leading={
                <Icon component={IconFontAwesome} name="lock" size={rem(1.4)} />
              }>
              <Form2TextInput secure placeholder="Your password" />
            </Form2Field>

            <Box right>
              <Gap v={1} />
              <LinkButton
                textStyle={{
                  textDecorationLine: 'underline',
                }}
                onPress={forgotPassword}>
                Forgot your password?
              </LinkButton>
            </Box>
          </Box>

          <Button
            loading={isLoading}
            disabled={isLoading}
            onPress={() => formRef.current.submit()}
            style={{marginLeft: rem(3), marginRight: rem(3)}}>
            LOGIN
          </Button>
        </Spacer>
      </Form2>

      <Gap v={2} />

      <Button
        onPress={() => {
          dispatch(toggleScheme());
        }}>
        Toggle Scheme
      </Button>

      <Gap v={2} />

      <View style={styles.contain__link}>
        <Text>Have not account yet? </Text>
        <LinkButton
          onPress={signup}
          textStyle={{
            textDecorationLine: 'underline',
          }}>
          Signup
        </LinkButton>
      </View>
    </Screen>
  );
};

export default withTheme(SignInScreen, () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: rem(2),
    },
    contain__title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: rem(1.5),
      // color: CARD.text,
      marginTop: rem(3),
      marginBottom: rem(4),
    },
    contain__link: {
      marginBottom: rem(2),
      fontSize: rem(1.4),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    error: {
      // color: COLORS.error,
    },
  }),
);
