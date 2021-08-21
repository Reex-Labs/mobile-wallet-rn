import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput as RTextInput,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import AuthContext from "../hooks/authContext";

import { Text, View, Button } from "../components/Themed";
import { isValidAddress } from "../utils/address";
import cosmolib from "../utils/cosmolib";
import { reexToCoin } from "../utils/reex";
import { Alert } from "react-native";

export default function TabTwoScreen() {
  const [to, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);

  const [hasPermission, setHasPermission] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const { address, mnemonic } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const hadleButtonScan = () => {
    setScanned(false);
    setScanning(true);
  };

  const handleBarCodeScanned = (scanResult: BarCodeScannerResult) => {
    const { type, data, bounds: { origin } = {} } = scanResult;
    setScanned(true);
    setScanning(false);
    if (isValidAddress(data)) {
      alert(`Отсканирован адрес: ${data}`);
      setAddress(data);
    } else {
      alert(`Этот QR-код не содержит адреса.`);
    }
  };

  function setBarcodeType() {
    setType(
      type === BarCodeScanner.Constants.Type.back
        ? BarCodeScanner.Constants.Type.front
        : BarCodeScanner.Constants.Type.back
    );
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function transfer() {
    const result = await cosmolib.sendToken(address, to, reexToCoin(amount).amount, mnemonic);
    if (result) {
      if (result.status) {
        Alert.alert('Перевод выполнен!')
      }
      else {
        Alert.alert('Ошибка', result.log);
      }
    }
    else {
      Alert.alert('Ошибка', 'Неизвестная ошибка. Возможно проблемы с интернетом.')
    }
  }

  const Scaner = () => (
    <View style={styles.scanerContainer}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        type={type}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={[StyleSheet.absoluteFillObject, styles.scaner]}
      >
        <View style={styles.opacityContainer}>
          {/* <BarcodeMask
            width={300}
            height={300}
            edgeColor="#22B1F6"
            showAnimatedLine
          /> */}
          <TouchableOpacity style={styles.opacity} onPress={setBarcodeType}>
            <Text style={{ fontSize: 16, marginLeft: 10, color: "white" }}>
              Нажми, что перевернуть камеру
            </Text>
          </TouchableOpacity>
        </View>
      </BarCodeScanner>
    </View>
  );

  function scan() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Отсканируйте QR-код, предоставленный получателем платежа.
        </Text>
        <Scaner />
        <Button title={"Назад"} onPress={() => setScanning(false)}></Button>
      </View>
    );
  }

  function screen() {
    return (
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
          <Button title={"тест"} onPress={transfer} />
        </View>
      </View>
    );
  }

  return scanning ? scan() : screen();
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
