import * as React from 'react';
import { StyleSheet } from 'react-native';

import HistoryTransactions from '../components/HistoryTransactions';
import { Text, View, Button } from '../components/Themed';
import { logout } from '../utils/auth';
import AuthContext from '../hooks/authContext';

export default function TabOneScreen({ navigation }: { navigation: any }) {
  const { setAuth, setWallet, balance } = React.useContext(AuthContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton />,
    });
  }, [navigation]);

  const HeaderButton = () => {
    return (
      <View style={{ marginRight: 8, marginTop: 2 }}>
        <Button onPress={onHeaderButtor} title="Выйти" />
      </View>
    );
  }

  const onHeaderButtor = () => {
    logout()
    setAuth(false)
    setWallet(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.balance}>
        <Text style={styles.title}>{balance}</Text>
        <Text style={styles.title2}>REEX</Text>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title={"Отправить"}
            onPress={() => navigation.navigate("TabTwo")}
          />
          <View style={styles.divider} />
          <Button style={styles.button} title={"Получить"} />
        </View>
      </View>

      <HistoryTransactions style={styles.history} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balance: {
    height: 200,
    textAlign: "center",
    backgroundColor: "#0063c0",
    // padding: "10%",
    paddingTop: "12%",
  },
  history: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
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
    marginTop: 24,
    backgroundColor: "transparent",
  },
  button: {},
  divider: {
    marginHorizontal: 10,
  },
});
