import * as React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function Password() {
    const [password, setPassword] = React.useState("");

  return (
      <View style={styles.container}>
          <Text>Введите пароль</Text>
      <TextInput value={password} onChangeText={setPassword} keyboardType={'visible-password'} placeholder={'Введите пароль'} />
    </View>
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
    fontSize: 20,
    fontWeight: "bold",
  },
});
