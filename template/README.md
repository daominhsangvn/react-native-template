# React Native Template

## Prerequisites
- NodeJS >= 14.x
- Android Studio 2020.3.1 Patch 4
- xCode 13.0

## Icon & SplashScreen
- Dependencies
    - `$ npm install -g app-icon`
    - Icon file size 1024x1024
- Generates new icon
```
$ app-icon generate -i assets/icon-android.png -p android --background-icon assets/icon-android-background.png --foreground-icon assets/icon-android-foreground.png --adaptive-icons
$ app-icon generate -i assets/icon-ios.png -p ios
```
- Generates new splash screen
```
$ yarn react-native generate-bootsplash assets/splashscreen.png --background-color=FFFFFF --logo-width=200
```

## Bottom TabBar
```
# router.js

import CustomTabBar from '@components/CustomTabBar';

function App() {
  return (
    <AppStack.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <AppStack.Screen
        options={{
          headerShown: false,
          labelShown: true,
          tabBarIcon: ({color, focused}) => (
            <Icon />
          ),
        }}
        ...
      />
      ...
    </AppStack.Navigator>
  );
}
```

## CodePush

## Firebase
- Follow instruction at https://rnfirebase.io/ to setup Firebase and download `google-services.json`
- Install additional dependencies:
```
yarn add --exact @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage
```
- Uncomment code in `src/lib/data/dataService.js` and `src/lib/data/providers/firebase.js`

## Chrome Debugger
Read more: https://reactnative.dev/docs/hermes
