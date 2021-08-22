import React, { useState, useContext } from "react";
import { StyleSheet, TextInput as RTextInput } from "react-native";
import AuthContext from "../hooks/authContext";

import { Text, View, Button } from "../components/Themed";
import { isValidAddress } from "../utils/address";
import cosmolib from "../utils/cosmolib";
import { reexToCoin } from "../utils/reex";
import { Alert } from "react-native";

import QrCodeScaner from "../components/QrCodeScaner";
import { BarCodeScannerResult } from "expo-barcode-scanner";

export default function TabSendScreen() {
  const [to, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [scanning, setScanning] = useState(false);

  const { address, mnemonic, setLoading } = useContext(AuthContext);

  const hadleButtonScan = () => {
    setScanning(true);
  };

  const handleBarCodeScanned = (scanResult: BarCodeScannerResult) => {
    setLoading(true);
    const { type, data, bounds: { origin } = {} } = scanResult;
    setScanning(false);
    if (isValidAddress(data)) {
      Alert.alert("Отсканирован адрес", data);
      setAddress(data);
    } else {
      alert(`Этот QR-код не содержит адреса.`);
    }
    setLoading(false);
  };

  function onButtonBack() {
    setScanning(false);
  }

  async function transfer() {
    setLoading(true);
    const result = await cosmolib.sendToken(
      address,
      to,
      reexToCoin(amount).amount,
      mnemonic
    );
    setLoading(false);
    if (result) {
      if (result.status) {
        Alert.alert("Перевод выполнен!", `${amount} REEX на адрес ${to}`);
      } else {
        Alert.alert("Ошибка", result.log);
      }
    } else {
      Alert.alert(
        "Ошибка",
        "Неизвестная ошибка. Возможно проблемы с интернетом."
      );
    }
  }

  return scanning ? (
    <QrCodeScaner
      handleBarCodeScanned={handleBarCodeScanned}
      onButtonBack={onButtonBack}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>
        Введите адрес кошелька, или отсканируйте QR-код, предоставленный
        получателем.
      </Text>
      <Button title={"Сканировать QR"} onPress={() => hadleButtonScan()} />
      <View style={styles.orText}>
        <Text>или</Text>
      </View>
      <View
        style={styles.inputGroup}
        lightColor="#fff"
        darkColor="rgba(255,255,255,0.1)"
      >
        <RTextInput
          style={styles.input}
          value={to}
          placeholder={"Введите адрес кошелька"}
          keyboardType={"default"}
          onChangeText={setAddress}
        />
        <RTextInput
          style={styles.input}
          value={amount}
          placeholder={"Введите сумму REEX"}
          keyboardType={"numeric"}
          onChangeText={setAmount}
        />
        <Button
          title={"ПЕРЕВЕСТИ"}
          disabled={!(to && amount)}
          onPress={transfer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scanerContainer: {
    width: 300,
    height: 300,
    overflow: "hidden",
    marginBottom: 30,
  },
  scaner: {
    flex: 1,
    height: 500,
  },
  opacityContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  opacity: {
    flex: 1,
    alignItems: "center",
  },
  inputGroup: {
    width: "80%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  separator: {
    height: 1,
    width: "80%",
  },
  orText: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
});
