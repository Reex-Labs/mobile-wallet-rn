import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function TabStakingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Стейкинг будет доступен позже.</Text>
      <Text style={styles.text}>
        Стейкинг - это делегирование своих REEX валидатору.
      </Text>
      <Text style={styles.text}>
        Валидатор - майнер, ответственный за хранение всей истории REEX и
        подтверждения её актуальности.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center"
  }
});
