module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.json'],
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@configs': './src/configs',
          '@lib': './src/lib',
          '@features': './src/features',
          '@screens': './src/screens',
          '@styles': './src/styles',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
