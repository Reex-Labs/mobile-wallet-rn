import './global'
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./hooks/authContext";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { checkWallet, getWallet } from "./utils/auth";
import { useBalance } from './hooks/useBalance';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isAuth, setAuth] = React.useState(false);
  const [isWallet, setWallet] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [mnemonic, setMnemonic] = React.useState("");
  const [balance, setBalance] = React.useState("0");

  useBalance(address, setBalance)

  checkWallet().then(async (result: boolean) => {
    setWallet(result);
    const wallet = await getWallet()
    setAddress(wallet.address ?? "");
    setMnemonic(wallet.mnemomic ?? "");
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider
        value={{
          setAuth,
          setWallet,
          setAddress,
          setMnemonic,
          address,
          mnemonic,
          isAuth,
          isWallet,
          balance,
        }}
      >
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AuthProvider>
    );
  }
}
