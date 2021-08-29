import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "../Themed";
import { IWallet } from "../../utils/store/wallet";
import { Ionicons } from "@expo/vector-icons";

export default function WalletList({
  walletList,
  active,
  onPress,
}: {
  walletList: IWallet[];
  active: IWallet["address"];
  onPress: (index: number) => void;
}) {
  const wallets = walletList.map((wallet, index) => {
    if (wallet) {
      return (
        <TouchableOpacity onPress={() => onPress(index)} key={index.toString()}>
          <View
            style={[styles.item, active === wallet.address && styles.active]}
            lightColor="#fefefe"
          >
            {/* <Text style={styles.title} lightColor="#777" darkColor="#ccc">
              Account{wallet.id}
            </Text> */}
            <Text style={styles.balance} lightColor="#06a">
              {wallet.balance} REEX
            </Text>
            <Text style={styles.address} lightColor="#888">
              {wallet.address}
            </Text>

            {active === wallet.address && (
              <View style={styles.iconContainer}>
                <Ionicons name="md-checkmark-circle" size={32} color="blue" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View key={index.toString()}>
          <Text>Ошибка кошелька</Text>
        </View>
      );
    }
  });

  return <View>{wallets}</View>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  item: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 0,
  },
  balance: {
    fontSize: 18
  },
  address: {
    fontSize: 14,
    marginTop: 10,
  },
  active: {
    borderWidth: 1,
    borderColor: "#999",
  },
  iconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "transparent",
  },
});
