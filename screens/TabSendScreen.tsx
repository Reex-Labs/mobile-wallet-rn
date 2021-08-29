import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import AuthContext from "../hooks/authContext";

import { Text, View, Button, TextInput } from "../components/Themed";
import { isValidAddress } from "../utils/address";
import cosmolib from "../utils/cosmolib";
import { isValidAmount, reexToCoin } from "../utils/reex";
import { Alert } from "react-native";

import QrCodeScaner from "../components/QrCodeScaner";
import { BarCodeScannerResult } from "expo-barcode-scanner";
import { TxsHistory } from "../utils/store";

function saveTx(from: string, to: string, amount: string) {
  TxsHistory.set({
    type: "Send",
    date: Date.now(),
    from: from,
    to: to,
    amount: amount,
    state: true,
  });
}

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
    if (!isValidAddress(to)) {
      Alert.alert("Небольшая ошибка", "Похоже вы неправильно ввели адрес");
      setLoading(false);
      return;
    }
    if (!isValidAmount(amount)) {
      Alert.alert(
        "Небольшая ошибка",
        "Похоже вы неправильно ввели сумму \nСумма должна быть не меньше 0.00001."
      );
      setLoading(false);
      return;
    }
    const result = await cosmolib.sendToken(
      address,
      to,
      reexToCoin(amount).amount,
      mnemonic
    );
    console.log('[tx] Result:', result);
    setLoading(false);
    if (result) {
      if (result.status) {
        Alert.alert("Перевод выполнен!", `${amount} REEX на адрес ${to}`);
        saveTx(address, to, amount);
      } else {
        if (result.code === 9) {
          Alert.alert("Ошибка", "Недостаточно средств.");
        } else {
          Alert.alert("Ошибка", result.log);
        }
      }
    } else {
      Alert.alert(
        "Ошибка",
        "Неизвестная ошибка перевода. Возможно, проблемы с интернетом, или что-то не так с адресом получателя."
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
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          value={to}
          placeholder={"Введите адрес кошелька"}
          keyboardType={"default"}
          onChangeText={setAddress}
          darkColor="#fff"
        />
        <TextInput
          style={styles.input}
          value={amount}
          placeholder={"Введите сумму REEX"}
          keyboardType={"numeric"}
          onChangeText={setAmount}
          darkColor="#fff"
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
