/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Welcome: undefined;
  Login: undefined;
  Import: undefined
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
  TabFour: undefined;
  TabFive: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type TabThreeParamList = {
  TabThreeScreen: undefined;
};

export type TabFourParamList = {
  TabFourScreen: undefined;
};

export type TabFiveParamList = {
  TabFiveScreen: undefined;
};

export interface TAuthContext {
  setAuth: (value: boolean) => void;
  setWallet: (value: boolean) => void;
  setAddress: (address: string) => void;
  setMnemonic: (address: string) => void;
  address: string;
  mnemonic: string;
  isAuth: boolean;
  isWallet: boolean;
  balance: string;
}