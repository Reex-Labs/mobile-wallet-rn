import * as React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { View, Text, Button } from "../components/Themed";
import AuthContext from "../hooks/authContext";
import { useContext } from "react";
import { Wallet } from "../utils/store";
import { useEffect } from "react";
import { useState } from "react";
import { IWallet } from "../utils/store/wallet";
import WalletList from "../components/settings/WalletList";

export default function SettingsScreen() {
  const { setAuth, setWallet, setAddress, setMnemonic, address } = useContext(AuthContext);
  const [walletList, setWalletList] = useState<IWallet[]>([]);

  useEffect(() => {
    Wallet.all().then((walletList) => {
      setWalletList(walletList);
    });
  }, []);

  const addNewWallet = () => {
    Wallet.setActive(null);
    setAuth(false);
    setWallet(false);
  };

  const save = () => {
    setTimeout(() => {}, 0);
  };

  const onPress = (index: number) => {
    const active = walletList[index];
    Wallet.setActive(index);
    setAddress(active.address);
    setMnemonic(active.mnemonic);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Аккаунты</Text>
        <WalletList walletList={walletList} active={address} onPress={onPress} />
        <View style={{paddingTop: 10}}>
          <Button title={"Добавить аккаунт"} onPress={addNewWallet}></Button>
        </View>

        {/* <Button title={"Сохранить"} onPress={save}></Button> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
