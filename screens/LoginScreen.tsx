import * as React from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import AuthContext from "../hooks/authContext";
import { useContext } from "react";

export default function LoginScreen() {
  const { setAuth } = useContext(AuthContext);

  const login = () => {
    setAuth(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать в REEX</Text>
      <Button title={"Вход"} onPress={login}></Button>
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
    marginBottom: 50
  },
});
