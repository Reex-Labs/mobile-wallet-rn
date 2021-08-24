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
  const dateObj = new Date(date);
  const day = ("0" + dateObj.getDate()).substr(-2);
  const month = ("0" + (dateObj.getMonth() + 1)).substr(-2);
  const year = dateObj.getFullYear();
  const formatedDate = `${day}.${month}.${year}`;
  
  return (
    <View style={styles.historyItem}>
      <Text
        style={styles.historyDateText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        {formatedDate}
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
      width: 100,
  },
  historyTypeText: {
    flex: 1,
  },
  historyAmount: {
      paddingHorizontal: 5,
      paddingRight: 15
  },
});
