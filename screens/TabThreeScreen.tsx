import * as React from "react";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet, TextInput as RTextInput } from "react-native";
import AuthContext from "../hooks/authContext";

import { Text, View } from "../components/Themed";

export default function TabThreeScreen() {
  const { address } = React.useContext(AuthContext);
  const isAddress = address ? true : false

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        Для перевода REEX на ваш кошелек вы должны сообщить отправителю свой
        адрес кошелька.
      </Text>
      <Text style={styles.title}>Ваш адрес кошелька REEX:</Text>
      {isAddress ? (
        <Text style={styles.addressText}>{address}</Text>
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
        <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
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
    backgroundColor: "#eee",
  },
  errorText: {
    color: "#900",
  },
});
