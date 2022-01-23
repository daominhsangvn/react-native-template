import Button from '@components/Button';
import LinkButton from '@components/LinkButton';
import Box from '@components/layouts/Box';
import Screen from '@components/layouts/Screen';
import Spacer from '@components/layouts/Spacer';
import {
  selectError,
  selectIsLoading,
} from '@features/authentication/store/sign-in/slice';
import {selectIsAuth} from '@features/authentication/store/user/slice';
import useAlertDiaLog from '@lib/alertDialog/useAlertDialog';
import {remScale} from '@lib/themes/utils';
import React, {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {yupResolver} from '@lib/utils/yupResolver';
import {CommonActions} from '@react-navigation/native';
import Logo from '@assets/svg/logo.svg';
import {
  selectIsThemeAuto,
  setAutoScheme,
  toggleScheme,
} from '@lib/themes/store';
import Icon from '@components/Icon';
import Gap from '@components/Gap';
import Text from '@components/Text';
import FormField from '@components/Form/components/Field';
import FormTextInput from '@components/Form/components/TextInput';
import useStyles from '@lib/themes/useStyles';
import ScrollView from '@components/ScrollView';
import NavBar from '@components/NavBar';
import Switch from '@components/Switch';
import useTheme from '@lib/themes/useTheme';

const schema = yup.object().shape({
  email: yup.string().required().email().min(6).max(50),
  password: yup.string().required().min(6).max(20),
});

const _styles = {
  container: {
    flex: 1,
  },
  scrollView: {
    padding: remScale(3),
  },
  error: {
    // color: COLORS.error,
  },
};

const SignInScreen = ({navigation}) => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isAuth = useSelector(selectIsAuth);
  const isAutoScheme = useSelector(selectIsThemeAuto);
  const {scheme} = useTheme();
  const dispatch = useDispatch();
  const styles = useStyles(_styles);
  const {showError} = useAlertDiaLog();

  const {control, handleSubmit} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'sang.dao@newoceaninfosys.com',
      password: '123456789',
    },
  });

  const resetRouteToHome = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'App'}],
        state: {routes: [{name: 'Home'}]},
      }),
    );
  }, [navigation]);

  const onSubmit = data => {
    resetRouteToHome();
  };

  const forgotPassword = useCallback(() => {}, []);

  const signup = useCallback(() => {}, []);

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

  return (
    <Screen safe navbar style={styles.container}>
      <NavBar transparent />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Box center style={{marginVertical: remScale(2)}}>
          <Logo width={100} height={100} />
        </Box>

        <Spacer spacing={2}>
          <FormField
            name="email"
            control={control}
            leading={<Icon name="mail-outline" />}>
            <FormTextInput placeholder="Your email" />
          </FormField>

          <Box>
            <FormField
              name="password"
              control={control}
              leading={<Icon name="lock-closed-outline" />}>
              <FormTextInput secure placeholder="Your password" />
            </FormField>

            <Box right>
              <Gap v={1} />
              <LinkButton onPress={forgotPassword}>
                Forgot your password?
              </LinkButton>
            </Box>
          </Box>

          <Button
            loading={isLoading}
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}>
            LOGIN
          </Button>
        </Spacer>

        <Gap v={2} />

        <Box row>
          <Box style={{flexShrink: 1, flex: 1}}>
            <Text>Use Device Scheme</Text>
          </Box>
          <Box>
            <Switch
              onChange={checked => {
                dispatch(setAutoScheme({auto: checked}));
              }}
              checked={isAutoScheme}
            />
          </Box>
        </Box>

        {!isAutoScheme && (
          <Box row style={{marginTop: remScale(2)}}>
            <Box style={{flexShrink: 1, flex: 1}}>
              <Text>{scheme === 'dark' ? 'Dark' : 'Light'}</Text>
            </Box>
            <Box>
              <Switch
                onChange={() => {
                  dispatch(toggleScheme());
                }}
                checked={scheme === 'dark'}
              />
            </Box>
          </Box>
        )}

        <Gap v={2} />

        <Box row center>
          <Text>Have not account yet? </Text>
          <LinkButton onPress={signup}>Signup</LinkButton>
        </Box>
      </ScrollView>
    </Screen>
  );
};

export default SignInScreen;
