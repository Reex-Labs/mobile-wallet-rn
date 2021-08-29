import * as React from "react";
import { StyleSheet, Button, TouchableOpacity } from "react-native";
import { genAddressReex } from "../utils/address";
import AuthContext from "../hooks/authContext";
import { Wallet } from "../utils/store";
import { View, Text } from "../components/Themed";

export default function WelcomeScreen({ navigation }: { navigation: any }) {
  const { setWallet, setLoading, loading } = React.useContext(AuthContext);
  const [ emptyWalletList, setEmptyWalletList ] = React.useState(true);

  async function createWallet() {
    setLoading(true);
    setTimeout(async () => {
      const { address, mnemonic } = await genAddressReex();
      await Wallet.add(address, mnemonic);
      navigation.navigate("MnemonicInfo", { mnemonic: mnemonic });
      setLoading(false);
    }, 0);
  }

  React.useEffect(() => {
    Wallet.all().then((walletList) => {
      if (walletList.length) {
        setEmptyWalletList(false);
      }
    });
  }, []);

  const onImportButton = () => {
    navigation.navigate("Import");
  };

  const onBackToWallet = () => {
    Wallet.setActive(0)
    setWallet(true)    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать в REEX</Text>
      {!emptyWalletList && (
        <TouchableOpacity onPress={onBackToWallet}>
          <Text style={styles.back} lightColor="#09f">
            Вернуться к кошельку
          </Text>
        </TouchableOpacity>
      )}
      <CreateWalletMain
        onCreateButton={createWallet}
        onImportButton={onImportButton}
        navigation={navigation}
        loading={loading}
      />
    </View>
  );
}

function CreateWalletMain({
  onCreateButton,
  onImportButton,
  navigation,
  loading,
}: {
  onCreateButton: () => void;
  onImportButton: () => void;
  navigation: any;
  loading: boolean;
}) {
  return (
    <View style={styles.block}>
      <View style={styles.block}>
        <Text style={styles.text}>
          Если у вас еще нет кошелька REEX, то создайте его!
        </Text>
        <View style={{ width: 200, alignSelf: "center" }}>
          <Button
            title={"Создать кошелек"}
            onPress={onCreateButton}
            // disabled={loading}
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
            // disabled={loading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  back: {
    // fontWeight: "bold",
    textDecorationLine: "underline",
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
