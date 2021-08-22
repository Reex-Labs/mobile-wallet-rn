import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Clipboard,
  Alert,
} from "react-native";
import AuthContext from "../hooks/authContext";

export default function MnemonicInfoScreen({ route }: { route: any }) {
  const { setWallet } = React.useContext(AuthContext);
  const { mnemonic } = route.params;

  const copyToClipboard = () => {
    Clipboard.setString(mnemonic);
    Alert.alert(
      "Скопировано",
      "Сид-фраза скопирована. Теперь вы можете сохранить её куда-нибудь."
    );
  };

  const onForwardButton = () => {
    setWallet(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Сохраните сид-фразу:</Text>
      <Text style={styles.warning}>
        Важно! Это сид-фраза - резервная фраза для вашего кошелька. Очень важно,
        что бы вы сохранили её в защищенное место. С помощью этой фразы вы
        сможете получить доступ к своему кошельку.
      </Text>
      <TouchableOpacity onPress={() => copyToClipboard()}>
        <Text style={styles.light}>Нажмите для копирования</Text>
        <Text style={(styles.title, styles.border)} selectable={true}>
          {mnemonic}
        </Text>
      </TouchableOpacity>
      <ForwardButton onForwardButton={onForwardButton} />
    </View>
  );
}

const ForwardButton = ({
  onForwardButton,
}: {
  onForwardButton: () => void;
}) => (
  <View style={{ marginTop: 20 }}>
    <Button title={"Готово"} onPress={onForwardButton} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  warning: {
    color: "#990000",
    marginVertical: 20,
    textAlign: "center",
  },
  light: {
    color: "#8bf",
    textAlign: "center",
  },
  border: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#aaa",
    borderWidth: 1,
  },
});
