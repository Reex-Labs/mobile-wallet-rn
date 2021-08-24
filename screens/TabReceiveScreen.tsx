import * as React from "react";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet, TouchableOpacity, Alert, Clipboard } from "react-native";
import AuthContext from "../hooks/authContext";

import { Text, View } from "../components/Themed";

export default function TabReceiveScreen() {
  const { address } = React.useContext(AuthContext);
  const isAddress = address ? true : false;

  const copyToClipboard = () => {
    Clipboard.setString(address);
    Alert.alert("Скопировано", "Ваш адрес скопирован.");
  };

  const AddressWithCopy = () => (
    <TouchableOpacity onPress={() => copyToClipboard()}>
      <Text style={styles.light}>Нажмите для копирования</Text>
      <Text style={styles.addressText} selectable={true}>
        {address}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} >
      <Text style={styles.info}>
        Для перевода REEX на ваш кошелек вы должны сообщить отправителю свой
        адрес кошелька.
      </Text>
      <Text style={styles.title}>Ваш адрес кошелька REEX:</Text>
      {isAddress ? (
        <AddressWithCopy />
      ) : (
        <Text style={[styles.errorText, styles.addressText]}>
          Ошибка адреса
        </Text>
      )}

      <Text style={styles.info}>
        Так же вы можете показать отправителю QR-код вашего кошелька, он
        отсканирует его приложением Reex Wallet, и автоматически получит адрес
        вашего кошелька.
      </Text>

      {isAddress && (
        <View lightColor="#555" darkColor="#eee">
          <QRCode value={address ?? "error"} size={250} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addressText: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  info: {
    margin: 10,
    padding: 10,
    backgroundColor: "transparent",
  },
  light: {
    color: "#8bf",
    textAlign: "center",
  },
  errorText: {
    color: "#900",
  },
});
