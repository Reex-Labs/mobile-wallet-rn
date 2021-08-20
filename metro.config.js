// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = {
resolver: {
  extraNodeModules: {
      stream: require.resolve('stream-browserify'),
    //   crypto: require.resolve('react-native-crypto-js'),
  }
},
}

module.exports = Object.assign(getDefaultConfig(__dirname), config);
