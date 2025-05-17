module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: ['nativewind/babel'],
  overrides: [
    {
      test: /node_modules\/(?!nativewind)/,
      compact: true,
    },
  ],
};
