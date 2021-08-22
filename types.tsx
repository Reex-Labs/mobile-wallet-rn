/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 * 
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Welcome: undefined;
  Login: undefined;
  Import: undefined;
  MnemonicInfo: undefined;
};

export type BottomTabParamList = {
  Wallet: undefined;
  Send: undefined;
  Receive: undefined;
  Staking: undefined;
  TabFive: undefined;
};

export type TabWalletParamList = {
  TabWalletScreen: undefined;
};

export type TabSendParamList = {
  TabSendScreen: undefined;
};

export type TabReceiveParamList = {
  TabReceiveScreen: undefined;
};

export type TabStakingParamList = {
  TabStakingScreen: undefined;
};

export type TabFiveParamList = {
  TabFiveScreen: undefined;
};

export interface TAuthContext {
  setAuth: (value: boolean) => void;
  setWallet: (value: boolean) => void;
  setAddress: (address: string) => void;
  setMnemonic: (address: string) => void;
  setLoading: (state: boolean) => void;
  address: string;
  mnemonic: string;
  isAuth: boolean;
  isWallet: boolean;
  balance: string;
  loading: boolean;
  balanceLoaded: boolean;
}