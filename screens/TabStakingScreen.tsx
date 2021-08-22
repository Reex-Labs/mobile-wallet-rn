import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function TabStakingScreen() {
  return (
    <View style={styles.container}>
      <Text>СКОРО</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
