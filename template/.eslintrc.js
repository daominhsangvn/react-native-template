module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'warn'
  }
};
