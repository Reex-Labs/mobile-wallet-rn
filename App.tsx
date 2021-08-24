import "./global";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./hooks/authContext";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { Auth } from "./utils/store";
import { useBalanceFetching } from "./hooks/useBalanceFetching";
import { useSavedBalance } from "./hooks/useSavedBalance";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isAuth, setAuth] = React.useState(false);
  const [isWallet, setWallet] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [mnemonic, setMnemonic] = React.useState("");
  const [balance, setBalance] = React.useState("0");
  const [balanceLoaded, setBalanceLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    Auth.saveBalanceToStore(balance);
  }, [balance])

  useEffect(() => {
    // useSavedBalance().then((balance) => {
    //   setBalance(balance);
    // });

    Auth.getWalletFromStore().then((wallet) => {
      if (wallet.address) {
        setWallet(true);
      }
      setAddress(wallet.address);
      setMnemonic(wallet.mnemomic);
      setBalance(wallet.balance);

      useBalanceFetching(wallet.address, (newBalance) => {
        if (newBalance !== balance) {
          setBalance(newBalance);
        }
        setBalanceLoaded(true);
      });
    });
  }, [isWallet]);

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
          setLoading,
          address,
          mnemonic,
          isAuth,
          isWallet,
          balance,
          loading,
          balanceLoaded,
        }}
      >
        <SafeAreaProvider>
          <View style={styles.flex}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
            {loading && (
              <View style={styles.loading}>
                <ActivityIndicator size={80} color="#fff"></ActivityIndicator>
              </View>
            )}
          </View>
        </SafeAreaProvider>
      </AuthProvider>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    opacity: 0.4,
  },
});
