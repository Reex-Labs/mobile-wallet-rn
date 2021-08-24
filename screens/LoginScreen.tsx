import * as React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "../components/Themed";
import AuthContext from "../hooks/authContext";
import { useContext } from "react";

export default function LoginScreen() {
  const { setAuth, setLoading } = useContext(AuthContext);

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setAuth(true);
      setLoading(false);
    }, 0);
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
  },
});
