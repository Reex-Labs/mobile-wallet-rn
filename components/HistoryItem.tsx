import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";

export default function HistoryItem({
  id,
  date,
  type,
  amount,
}: {
  id: any;
  date: any;
  type: any;
  amount: any;
}) {
  return (
    <View style={styles.historyItem}>
      <Text
        style={styles.historyDateText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        {date}
      </Text>
      <Text
        style={styles.historyTypeText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        {type}
      </Text>
      <Text
        style={styles.historyAmount}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  historyItem: {
    flex: 1,
    flexDirection: "row",
  },
  historyDateText: {
      paddingHorizontal: 5,
      width: 80,
  },
  historyTypeText: {
    flex: 1,
  },
  historyAmount: {
      paddingHorizontal: 5,
      paddingRight: 15
  },
});
