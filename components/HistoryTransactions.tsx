import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View, ScrollView } from "./Themed";
import HistoryItem from "./HistoryItem";

import historyList from "../mocks/hystoryMock";

export default function HistoryTransactions({ style }: { style: any }) {
  const renderItem = ({ item }: { item: any }) => (
    <HistoryItem
      id={item.id}
      date={item.date}
      type={item.type}
      amount={item.amount}
    />
  );

  return (
    <View style={style}>
      <View style={styles.historyTitleContainer}>
        <Text
          style={styles.historyTitle}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          История
        </Text>
      </View>

      <FlatList
        data={historyList}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
        style={styles.historyList}
      />
    </View>
  );
}

function handleItemPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  historyTitleContainer: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  historyTitle: {
    fontSize: 17,
    lineHeight: 24,
    marginVertical: 6,
    textAlign: "center",
  },
  separator: {
    height: 1,
  },
  historyListContainer: {
  },
  historyList: {
    height: "100%",
  },
});
