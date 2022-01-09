import React, {useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home';
import SampleScreen from '@screens/Sample';
import SignInScreen from '@screens/SignIn';
import {useSelector} from 'react-redux';
import {selectIsAuth} from '@features/authentication/store/user/slice';
import RNBootSplash from 'react-native-bootsplash';
import Header from '@components/Header';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

function App() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={{
          header: props => <Header {...props} />,
        }}
        name="Home"
        component={HomeScreen}
      />
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="Sample"
        component={SampleScreen}
      />
    </AppStack.Navigator>
  );
}

function Auth() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
    </AuthStack.Navigator>
  );
}

const Router = () => {
  // const theme = useTheme();
  const isAuth = useSelector(selectIsAuth);

  const initialRouteName = isAuth ? 'App' : 'Auth';

  // const NavigationTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: 'rgb(255, 45, 85)',
  //     background: theme.COLORS.background,
  //     text: theme.COLORS.text,
  //   },
  // };

  const onNavigationReady = useCallback(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 1000);
  }, []);

  return (
    <NavigationContainer onReady={onNavigationReady}>
      <MainStack.Navigator initialRouteName={initialRouteName}>
        <MainStack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="App"
          component={App}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
