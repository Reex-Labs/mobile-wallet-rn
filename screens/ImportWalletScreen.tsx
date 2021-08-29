import React, { useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { Wallet } from "../utils/store";
import AuthContext from "../hooks/authContext";
import { isValidMnemonic, getAddressReex } from "../utils/address";
import { View, Text, Button, TextInput } from "../components/Themed";

export default function ImportWalletScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [mnemonic, onChangeMnemonic] = React.useState("");
  const { setWallet, setLoading, loading } = useContext(AuthContext);

  const onImport = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        if (isValidMnemonic(mnemonic)) {
          const address = await getAddressReex(mnemonic);
          await Wallet.add(address, mnemonic);
          setWallet(true);
        } else {
          Alert.alert("", "Введите правильную сид-фразу.");
        }
        setLoading(false);
      } catch (e) {
        Alert.alert("Ошибка", e);
      }
    }, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать в REEX</Text>
      <Text style={styles.comment}>
        Сид-фраза, еще её называют "резервная фраза" - это основной пароль от
        аккаунта в блокчейне.
      </Text>
      <Text style={styles.comment}>
        Если у вас уже есть аккаунт в блокчейне REEX, то вы должны знать
        сид-фразу. Еще существует закрытый ключ - это то, во что преобразуется
        сид-фраза при авторизации REEX. Если у вас есть только закрытый ключ, то
        напишите нам в телеграм, мы найдем вам конвертер из закрытого ключа в
        сид-фразу
      </Text>

      <Text style={styles.text}>
        Введите резервную фразу (сид-фразу) в поле ниже.
      </Text>

      <View style={{ width: "80%" }}>
        <TextInput
          multiline={true}
          numberOfLines={6}
          onChangeText={(text: any) => onChangeMnemonic(text)}
          value={mnemonic}
          style={styles.input}
          maxLength={200}
          darkColor="#fff"
        />
      </View>

      <View style={{ paddingTop: 10 }}>
        <Button title={"Импортировать"} onPress={onImport} />
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
  comment: {
    fontSize: 12,
    color: "#777",
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    // backgroundColor: "#fff",
    // color: "#fff",
  },
});
