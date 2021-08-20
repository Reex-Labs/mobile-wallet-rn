import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { newAuth } from "../utils/auth";
import { genAddressReex } from "../utils/address";
import AuthContext from "../hooks/authContext";

export default function WelcomeScreen({ navigation }: { navigation: any }) {
  const { setWallet, setAddress, address } = React.useContext(AuthContext);
  const [mnemonicState, setMnemonic] = React.useState("");

  async function createWallet() {
    const { address, mnemonic } = await genAddressReex();

    await newAuth(address, mnemonic);
    setAddress(address);
    setMnemonic(mnemonic);
  }

  const onForwardButton = () => {
    setWallet(true);
  };

  const onImportButton = () => {
    navigation.navigate("Import");
  };

  const ForwardButton = () => {
    if (address && mnemonicState) {
      return (
        <View style={{ marginTop: 20 }}>
          <Button title={"Далее"} onPress={onForwardButton} />
        </View>
      );
    }
    return <Text></Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать в REEX</Text>
      {address && mnemonicState ? (
        <>
          <Text style={styles.warning}>
            Важно! Это сид-фраза - резервная фраза для вашего кошелька. Очень
            важно, что бы вы сохранили её в защищенное место. С помощью этой
            фразы вы сможете получить доступ к своему кошельку.
          </Text>
          <Text style={styles.title} selectable={true}>
            {mnemonicState}
          </Text>
          <ForwardButton />
        </>
      ) : (
        <>
          <View style={styles.block}>
            <Text style={styles.text}>
              Если у вас еще нет кошелька REEX, то создайте его!
            </Text>
            <View style={{ width: 200, alignSelf: "center" }}>
              <Button title={"Создать кошелек"} onPress={createWallet} />
            </View>
          </View>

          <Text style={styles.title}>или</Text>
          <View style={styles.block}>
            <Text style={styles.text}>импортируейте существующий</Text>
            <View style={{ width: 200, alignSelf: "center" }}>
              <Button title={"Импорт"} onPress={onImportButton} />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  warning: {
    color: "#990000",
    marginVertical: 20,
    textAlign: "center"
  },
  block: {
    marginVertical: 20,
    textAlign: "center",
  },
});
