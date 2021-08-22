import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { genAddressReex } from "../utils/address";
import AuthContext from "../hooks/authContext";
import { saveWalletToStore } from "../utils/auth";

export default function WelcomeScreen({ navigation }: { navigation: any }) {
  const { setWallet, setLoading, loading } = React.useContext(AuthContext);

  async function createWallet() {
    setLoading(true);
    setTimeout(async () => {
      const { address, mnemonic } = await genAddressReex();
      saveWalletToStore(address, mnemonic);
      setWallet(true)
      navigation.navigate("MnemonicInfo", { mnemonic });
      setLoading(false);
    }, 0);
  }

  const onImportButton = () => {
    navigation.navigate("Import");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать в REEX</Text>
      <CreateWalletMain
        onCreateButton={createWallet}
        onImportButton={onImportButton}
        loading={loading}
      />
    </View>
  );
}

function CreateWalletMain({
  onCreateButton,
  onImportButton,
  loading,
}: {
  onCreateButton: () => void;
  onImportButton: () => void;
  loading: boolean;
}) {
  return (
    <>
      <View style={styles.block}>
        <Text style={styles.text}>
          Если у вас еще нет кошелька REEX, то создайте его!
        </Text>
        <View style={{ width: 200, alignSelf: "center" }}>
          <Button
            title={"Создать кошелек"}
            onPress={onCreateButton}
            disabled={loading}
          />
        </View>
      </View>

      <Text style={styles.title}>или</Text>
      <View style={styles.block}>
        <Text style={styles.text}>импортируейте существующий</Text>
        <View style={{ width: 200, alignSelf: "center" }}>
          <Button
            title={"Импорт"}
            onPress={onImportButton}
            disabled={loading}
          />
        </View>
      </View>
    </>
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
    textAlign: "center",
  },
  border: {
    padding: 10,
    borderColor: "#aaa",
    borderWidth: 1,
  },
  block: {
    marginVertical: 20,
    textAlign: "center",
  },
});
