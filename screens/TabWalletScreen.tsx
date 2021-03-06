import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

import HistoryTransactions from '../components/HistoryTransactions';
import { Text, View, Button } from '../components/Themed';
import { Auth } from "../utils/store/";
import AuthContext from '../hooks/authContext';
import { Ionicons } from '@expo/vector-icons';

export default function TabWalletScreen({ navigation }: { navigation: any }) {
  const { setAuth, setWallet, balance, balanceLoaded } =
    React.useContext(AuthContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton />,
    });
  }, [navigation]);

  const HeaderButton = () => {
    return (
      <View style={{ marginRight: 8, marginTop: 2 }}>
        <TouchableOpacity onPress={onHeaderButtor}>
          <Ionicons name="settings-outline" size={32} color="#777" />
        </TouchableOpacity>
      </View>
    );
  };

  const onHeaderButtor = () => {
    navigation.navigate("Settings")
  };

  return (
    <View style={styles.container}>
      <View style={styles.balance}>
        <Text style={styles.title}>{balance}</Text>
        <Text style={styles.title2}>REEX</Text>
        <ActivityIndicator animating={!balanceLoaded} color="#fff" />

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title={"Отправить"}
            onPress={() => navigation.navigate("Send")}
          />
          <View style={styles.divider} />
          <Button
            style={styles.button}
            title={"Получить"}
            onPress={() => navigation.navigate("Receive")}
          />
        </View>
      </View>

      {/* <HistoryTransactions style={styles.history} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balance: {
    flex: 1,
    // justifyContent: 'center',
    // height: 220,
    textAlign: "center",
    backgroundColor: "#0063c0",
    // backgroundColor: "#004F99",
    paddingTop: "30%",
  },
  title: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
  },
  title2: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 34,
    backgroundColor: "transparent",
  },
  button: {},
  divider: {
    marginHorizontal: 10,
  },
});
