/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Welcome: "Welcome",
      Login: "Login",
      Import: "Import",
      MnemonicInfo: "MnemonicInfo",
      Root: {
        screens: {
          Wallet: {
            screens: {
              TabWalletScreen: "Wallet",
            },
          },
          Send: {
            screens: {
              TabSendScreen: "Send",
            },
          },
          Receive: {
            screens: {
              TabReceiveScreen: "Receive",
            },
          },
          Staking: {
            screens: {
              TabStakingScreen: "Staking",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
