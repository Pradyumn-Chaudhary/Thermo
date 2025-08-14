module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    '@babel/preset-typescript' // add this line
  ],
  plugins: [
    'react-native-worklets-core/plugin',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ],
};
