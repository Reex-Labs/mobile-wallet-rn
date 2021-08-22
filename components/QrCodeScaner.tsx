import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
// import BarcodeMask from "react-native-barcode-mask";
import AuthContext from "../hooks/authContext";

import { Text, View, Button } from "../components/Themed";

export default function QrCodeScaner({
  handleBarCodeScanned,
  onButtonBack,
}: {
  handleBarCodeScanned: any;
  onButtonBack: () => void;
}) {
  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setLoading(false);
    })();
  }, []);

  function setBarcodeType() {
    setType(
      type === BarCodeScanner.Constants.Type.back
        ? BarCodeScanner.Constants.Type.front
        : BarCodeScanner.Constants.Type.back
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Кошельку REEX необходимо дать разрешение на использование камеры.
        </Text>
        <Text style={styles.title}>Это можно сделать в настройках.</Text>
      </View>
    );
  }

  const Scaner = () => (
    <View style={styles.scanerContainer}>
      {hasPermission && (
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
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Отсканируйте QR-код, предоставленный получателем платежа.
      </Text>
      <Scaner />
      <Button title={"Назад"} onPress={onButtonBack}></Button>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
});
